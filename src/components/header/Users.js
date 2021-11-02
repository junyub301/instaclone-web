import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { PHOTO_FRAGMENT } from "../../fragments";
import User from "./User";

const SEARCH_USERS_QUERY = gql`
    query searchUsers($keyword: String!, $lastId: Int) {
        searchUsers(keyword: $keyword, lastId: $lastId) {
            id
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

const UsersContainer = styled.div`
    border: 0px solid rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.098) 0px 0px 5px 1px;
    height: 375px;
    width: 362px;
    display: flex;
    flex-direction: column;
`;

function Users({ username }) {
    const { data } = useQuery(SEARCH_USERS_QUERY, {
        variables: {
            keyword: username,
        },
    });
    return (
        <UsersContainer>
            {data?.searchUsers?.map((user) => (
                <User
                    key={user.id}
                    id={user.id}
                    avatar={user.avatar}
                    username={user.username}
                    firstName={user.firstName}
                    lastName={user.lastName}
                />
            ))}
        </UsersContainer>
    );
}

export default Users;
