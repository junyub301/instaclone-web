import styled from "styled-components";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import * as sanitizeHtml from "sanitize-html";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
    margin-left: 10px;
    mark {
        background-color: inherit;
        color: ${(props) => props.theme.accent};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

function Comment({ author, payload }) {
    const cleanPayload = sanitizeHtml(
        payload.replace(/#[\w]+/g, "<mark>$&</mark>"),
        {
            allowedTags: ["mark"],
        }
    );

    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            <CommentCaption
                dangerouslySetInnerHTML={{
                    __html: cleanPayload,
                }}
            />
        </CommentContainer>
    );
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
};

export default Comment;
