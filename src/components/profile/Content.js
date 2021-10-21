import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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

function Content({ photo }) {
    return (
        <Photo bg={photo.file}>
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
    );
}

export default Content;
