import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

const UserContainer = styled(Link)`
    display: flex;
    justify-content: flex-start;
    padding: 8px 16px;
    div:first-child {
        margin-right: 12px;
    }
`;

const Id = styled.div`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
`;

const Name = styled.div`
    color: rgba(var(--f52, 142, 142, 142), 1);
`;

function User({ id, avatar, username, firstName, lastName }) {
    return (
        <UserContainer to={`/users/${username}`}>
            <div>
                <Avatar lg url={avatar} />
            </div>
            <div>
                <Id>{username}</Id>
                <Name>
                    {lastName}
                    {firstName}
                </Name>
            </div>
        </UserContainer>
    );
}

export default User;
