import { gql, useQuery, useMutation, useApolloClient } from "@apollo/client";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "../fragments";
import styled from "styled-components";
import { FatText } from "../components/shared";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import useUser from "../hooks/useUser";

const FOLLOW_USER_MUTATION = gql`
    mutation followUser($username: String!) {
        followUser(username: $username) {
            ok
        }
    }
`;

const UNFOLLOW_USER_MUTATION = gql`
    mutation unfollowUser($username: String!) {
        unfollowUser(username: $username) {
            ok
        }
    }
`;

const SEE_PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username: $username) {
            firstName
            lastName
            username
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            isMe
            isFollowing
            totalPhotos
        }
    }
    ${PHOTO_FRAGMENT}
`;

const Container = styled.div`
    direction: flex;
    padding: 30px 20px 0px;
`;

const Header = styled.div`
    display: flex;
`;
const Avatar = styled.img`
    margin-left: 50px;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    margin-right: 100px;
    background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
    font-size: 28px;
    font-weight: 400;
`;
const Row = styled.div`
    margin-bottom: 20px;
    font-size: 16px;
    display: flex;
`;
const List = styled.ul`
    display: flex;
`;
const Item = styled.li`
    margin-right: 20px;
`;
const Value = styled(FatText)`
    font-size: 17px;
    margin-left: 4px;
`;
const Name = styled(FatText)`
    font-size: 20px;
`;

const Grid = styled.div`
    display: grid;
    grid-auto-rows: 290px;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 50px;
`;

const Photo = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    position: relative;
`;

const Icons = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
`;

const Icon = styled.span`
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 0px 5px;
    svg {
        font-size: 14px;
        margin-right: 5px;
    }
`;

// 상속된 스타일은 유지하되 태그 타입을 변형 시킬 때 사용
const ProfileBtn = styled(Button).attrs({
    as: "span",
})`
    margin-left: 20px;
    margin-top: 0px;
    background-color: rgb(0, 0, 0, 0);
    color: rgba(var(--f75, 38, 38, 38), 1);
    border-radius: 4px;
    width: 84px;
    height: 30px;
    border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
    cursor: pointer;
`;

function Profile() {
    const { username } = useParams();
    const { data: userData } = useUser();
    const client = useApolloClient();
    const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            username,
        },
    });
    const unfollowUserUpdate = (cache, result) => {
        const {
            data: {
                unfollowUser: { ok },
            },
        } = result;
        if (!ok) {
            return;
        }
        cache.modify({
            id: `User:${username}`,
            fields: {
                isFollowing(prev) {
                    return false;
                },
                totalFollowers(prev) {
                    return prev - 1;
                },
            },
        });
        const { me } = userData;
        cache.modify({
            id: `User:${me.username}`,
            fields: {
                totalFollowing(prev) {
                    return prev - 1;
                },
            },
        });
    };
    const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
        variables: {
            username,
        },
        update: unfollowUserUpdate,
    });
    const followUserCompleted = (data) => {
        const {
            followUser: { ok },
        } = data;
        if (!ok) {
            return;
        }
        const { cache } = client;
        cache.modify({
            id: `User:${username}`,
            fields: {
                isFollowing(prev) {
                    return true;
                },
                totalFollowers(prev) {
                    return prev + 1;
                },
            },
        });
        const { me } = userData;
        cache.modify({
            id: `User:${me.username}`,
            fields: {
                totalFollowing(prev) {
                    return prev + 1;
                },
            },
        });
    };
    const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
        variables: {
            username,
        },
        onCompleted: followUserCompleted,
    });
    const getButton = (seeProfile) => {
        const { isMe, isFollowing } = seeProfile;
        if (isMe) {
            return <ProfileBtn>프로필 편집</ProfileBtn>;
        }
        if (isFollowing) {
            return <ProfileBtn onClick={unfollowUser}>Unfollow</ProfileBtn>;
        } else {
            return <ProfileBtn onClick={followUser}>Follow</ProfileBtn>;
        }
    };
    return (
        <Container>
            <PageTitle
                title={
                    loading
                        ? "Loading..."
                        : `${data?.seeProfile?.username}'s Profile`
                }
            />
            <Header>
                <Avatar src={data?.seeProfile?.avatar} />
                <Column>
                    <Row>
                        <Username>{data?.seeProfile?.username}</Username>
                        {data?.seeProfile ? getButton(data.seeProfile) : null}
                    </Row>
                    <Row>
                        <List>
                            <Item>
                                <span>
                                    게시물
                                    <Value>
                                        {data?.seeProfile?.totalPhotos}
                                    </Value>{" "}
                                </span>
                            </Item>
                            <Item>
                                <span>
                                    팔로워
                                    <Value>
                                        {data?.seeProfile?.totalFollowers}
                                    </Value>{" "}
                                </span>
                            </Item>
                            <Item>
                                <span>
                                    팔로잉
                                    <Value>
                                        {data?.seeProfile?.totalFollowing}
                                    </Value>{" "}
                                </span>
                            </Item>
                        </List>
                    </Row>
                    <Row>
                        <Name>
                            {data?.seeProfile?.firstName}
                            {"  "}
                            {data?.seeProfile?.lastName}
                        </Name>
                    </Row>
                    <Row>{data?.seeProfile?.bio}</Row>
                </Column>
            </Header>
            <Grid>
                {data?.seeProfile?.photos.map((photo) => (
                    <Photo key={photo.id} bg={photo.file}>
                        <Icons>
                            <Icon>
                                <FontAwesomeIcon icon={faHeart} />
                                {photo.likes}
                            </Icon>
                            <Icon>
                                <FontAwesomeIcon icon={faComment} />
                                {photo.commentNumber}
                            </Icon>
                        </Icons>
                    </Photo>
                ))}
            </Grid>
        </Container>
    );
}

export default Profile;
