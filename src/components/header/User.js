import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

const UserContainer = styled(Link)`
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
`;

function User({ id, avatar, username, firstName, lastName }) {
    return (
        <UserContainer>
            <div>
                <Avatar lg url={avatar} />
            </div>
            <div>
                <div>{username}</div>
                <div>
                    {lastName}
                    {firstName}
                </div>
            </div>
            <div>삭제</div>
        </UserContainer>
    );
}

export default User;
