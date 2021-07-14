import { useParams } from "react-router-dom";

function Profile() {
    const { username } = useParams();
    return "profile";
}

export default Profile;
