import { useReactiveVar, gql, useQuery } from "@apollo/client";
import { faCompass, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../screens/routes";
import Avatar from "./Avatar";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { PHOTO_FRAGMENT } from "../fragments";

const SEARCH_USERS_QUERY = gql`
    query searchUsers($keyword: String!, $lastId: Int) {
        searchUsers(keyword: $keyword, lastId: $lastId) {
            firstName
            lastName
            username
            bio
            avatar
            photos {
                ...PhotoFragment
            }
        }
    }
    ${PHOTO_FRAGMENT}
`;

const SHeader = styled.header`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.bgColor};
    /* padding: 18px 0px; */
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    max-width: 930px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
    margin-left: 15px;
`;

const Button = styled.span`
    background-color: ${(props) => props.theme.accent};
    border-radius: 4px;
    padding: 4px 15px;
    color: white;
    font-weight: 600;
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 103px;
    height: 48;
`;

const Input = styled.input`
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    height: 28px;
    width: 215px;
    &::placeholder {
        align-items: center;
        text-align: center;
        font-size: 12px;
    }
`;

const UserContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border: 0px solid rgb(0, 0, 0);
    top: 12px;
`;

const Users = styled.div`
    border: 0px solid rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.098) 0px 0px 5px 1px;
    height: 375px;
    width: 362px;
`;

function Header() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { data } = useUser();
    const { register, watch } = useForm({
        mode: "onChange",
        defaultValues: {
            username: "",
        },
    });
    const { username } = watch();

    const { data: searchUser, loading } = useQuery(SEARCH_USERS_QUERY, {
        variables: {
            keyword: username,
        },
    });

    return (
        <SHeader>
            <Wrapper>
                <Column>
                    <Link to={"/"}>
                        <Logo src='/logo.png' />
                    </Link>
                    {/* <FontAwesomeIcon icon={faInstagram} size='2x' /> */}
                </Column>
                <Column>
                    <Input
                        {...register("username")}
                        type='text'
                        placeholder='검색'
                    />
                    <UserContainer>
                        <Users />
                    </UserContainer>
                </Column>
                <Column>
                    {isLoggedIn ? (
                        <IconsContainer>
                            <Link to={routes.home}>
                                <FontAwesomeIcon icon={faHome} size='lg' />
                            </Link>
                            <Icon>
                                <FontAwesomeIcon icon={faCompass} size='lg' />
                            </Icon>
                            <Icon>
                                <Link to={`/users/${data?.me?.username}`}>
                                    <Avatar url={data?.me?.avatar} />
                                </Link>
                            </Icon>
                        </IconsContainer>
                    ) : (
                        <Link to={routes.home}>
                            <Button>Login</Button>
                        </Link>
                    )}
                </Column>
            </Wrapper>
        </SHeader>
    );
}

export default Header;
