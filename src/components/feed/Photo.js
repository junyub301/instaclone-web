import { gql, useMutation } from "@apollo/client";
import {
    faBookmark,
    faComment,
    faHeart,
    faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
    faBookmark as SolidBookmark,
    faHeart as SolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import Comments from "./Comments";

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
        }
    }
`;

const TOGGLE_SAVE_MUTATION = gql`
    mutation toggleSave($id: Int!) {
        toggleSave(id: $id) {
            ok
            error
        }
    }
`;

const PhotoContainer = styled.div`
    background-color: white;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 60px;
    max-width: 615px;
`;
const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    min-width: 100%;
    max-width: 100%;
`;

const PhotoData = styled.div`
    padding: 12px 15px;
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

const BookmarkAction = styled.div`
    cursor: pointer;
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
    isSaved,
}) {
    const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: { ok },
            },
        } = result;

        if (ok) {
            // Porps로 값을 넘기지 않았을 경우 cahce를 통해 값을 받아와 update할 수 있다.
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    likes(prev) {
                        if (isLiked) {
                            return prev - 1;
                        }
                        return prev + 1;
                    },
                },
            });
        }
    };

    const updateToggleSave = (cache, result) => {
        const {
            data: {
                toggleSave: { ok },
            },
        } = result;

        if (ok) {
            // Porps로 값을 넘기지 않았을 경우 cahce를 통해 값을 받아와 update할 수 있다.
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isSaved(prev) {
                        return !prev;
                    },
                },
            });
        }
    };
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id,
        },
        update: updateToggleLike,
    });

    const [toggleSaveMutation] = useMutation(TOGGLE_SAVE_MUTATION, {
        variables: {
            id,
        },
        update: updateToggleSave,
    });

    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Link to={`/users/${user.username}`}>
                    <Avatar lg url={user.avatar} />
                </Link>
                <Link to={`/users/${user.username}`}>
                    <Username>{user.username}</Username>
                </Link>
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
                        <BookmarkAction onClick={toggleSaveMutation}>
                            <FontAwesomeIcon
                                icon={isSaved ? SolidBookmark : faBookmark}
                            />
                        </BookmarkAction>
                    </div>
                </PhotoActions>
                <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
                <Comments
                    photoId={id}
                    author={user.username}
                    caption={caption}
                    commentNumber={commentNumber}
                    comments={comments}
                />
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
};

export default Photo;
