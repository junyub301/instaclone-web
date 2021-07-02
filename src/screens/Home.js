import { logUserOut } from "../apollo";

const Home = () => {
    return (
        <div>
            <h1>Weclome we did it!</h1>
            <button onClick={() => logUserOut()}>Log out Now!</button>
        </div>
    );
};
export default Home;
