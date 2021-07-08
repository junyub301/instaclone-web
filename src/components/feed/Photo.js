import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import {
    faBookmark,
    faComment,
    faHeart,
    faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
        }
    }
`;

const PhotoContainer = styled.div`
    background-color: white;
    border: 1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 20px;
    max-width: 615px;
`;
const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const Username = styled(FatText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    min-width: 100%;
`;

const PhotoData = styled.div`
    padding: 15px;
`;

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
    svg {
        font-size: 20px;
    }
`;

const PhotoAction = styled.div`
    margin-right: 10px;
    cursor: pointer;
`;

const Likes = styled(FatText)`
    margin-top: 15px;
    display: block;
`;

const Comments = styled.div`
    margin-top: 20px;
`;
const Comment = styled.div``;
const CommentCaption = styled.span`
    margin-left: 10px;
`;

const CommentCount = styled.span`
    opacity: 0.7;
    margin: 10px 0px;
    display: block;
    font-weight: 600;
    font-size: 12px;
`;

function Photo({
    id,
    user,
    file,
    isLiked,
    likes,
    caption,
    commentNumber,
    comments,
}) {
    const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: { ok },
            },
        } = result;

        if (ok) {
            // Porps로 값을 넘기지 않았을 경우 cahce를 통해 값을 받아와 update할 수 있다.
            const fragementId = `Photo:${id}`;
            const fragment = gql`
                # fragment (name) on (type)
                fragment BSName on Photo {
                    # 수정할 부분
                    isLiked
                    likes
                }
            `;
            const result = cache.readFragment({
                id: fragementId,
                fragment,
            });
            if ("isLiked" in result && "likes" in result) {
                const { isLiked: cacheIsLiked, likes: chacheLikes } = result;
                cache.writeFragment({
                    id: fragementId,
                    // 데이터의 일부분
                    fragment,
                    data: {
                        isLiked: !cacheIsLiked,
                        likes: cacheIsLiked ? chacheLikes - 1 : chacheLikes + 1,
                    },
                });
            }
        }
    };
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id,
        },
        update: updateToggleLike,
    });
    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Avatar lg url={user.avatar} />
                <Username>{user.username}</Username>
            </PhotoHeader>
            <PhotoFile src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLikeMutation}>
                            <FontAwesomeIcon
                                style={{
                                    color: isLiked ? "tomato" : "inherit",
                                }}
                                icon={isLiked ? SolidHeart : faHeart}
                            />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faComment} />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </PhotoAction>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                </PhotoActions>
                <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
                <Comments>
                    <Comment>
                        <FatText>{user.username}</FatText>
                        <CommentCaption>{caption}</CommentCaption>
                    </Comment>
                    <CommentCount>
                        {commentNumber === 1
                            ? "1 comment"
                            : `${commentNumber} comments`}
                    </CommentCount>
                </Comments>
            </PhotoData>
        </PhotoContainer>
    );
}

Photo.protoTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    commentNumber: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Photo;
