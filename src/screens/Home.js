import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMNET_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import styled from "styled-components";

const FEED_QUERY = gql`
    query seeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMNET_FRAGMENT}
`;

const Container = styled.div`
    direction: flex;
    padding: 30px 20px 0px;
`;
const Home = () => {
    const { data } = useQuery(FEED_QUERY, { variables: { offset: 0 } });
    return (
        <Container>
            <PageTitle title='Home' />
            {data?.seeFeed?.map((photo) => (
                <Photo key={photo.id} {...photo} />
            ))}
        </Container>
    );
};
export default Home;
