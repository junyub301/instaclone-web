import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMNET_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
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

const Home = () => {
    const { data } = useQuery(FEED_QUERY);

    return (
        <div>
            <PageTitle title='Home' />
            {data?.seeFeed?.map((photo) => (
                <Photo key={photo.id} {...photo} />
            ))}
        </div>
    );
};
export default Home;
