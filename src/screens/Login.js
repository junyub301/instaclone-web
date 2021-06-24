import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faFacebookF,
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const WhiteBox = styled.div`
    background-color: white;
    border: 1px solid rgb(219, 219, 219);
    width: 100%;
`;

// WhiteBox css 상속
const TopBox = styled(WhiteBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    form {
        margin-top: 35px;
        width: 100%;
        display: flext;
        justify-content: center;
        flex-direction: center;
        align-items: center;
        input {
            width: 100%;
            border-radius: 3px;
            padding: 7px;
            background-color: #fafafa;
            border: 0.5px solid rgb(219, 219, 219);
            margin-top: 5px;
            box-sizing: border-box;
            &:last-child {
                border: none;
                margin-top: 12px;
                background-color: #0095f6;
                color: white;
                text-align: center;
                padding: 6px 0px;
                font-weight: 500;
            }
        }
    }
`;
const BottomBox = styled(WhiteBox)`
    padding: 10px 0px;
    text-align: center;
`;

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`;

const Login = () => {
    return (
        <Container>
            <Wrapper>
                <TopBox>
                    <div>
                        <FontAwesomeIcon icon={faInstagram} size='3x' />
                    </div>
                    <form>
                        <input type='text' placeholder='Username' required />
                        <input
                            type='password'
                            placeholder='Password'
                            required
                        />
                        <input type='submit' value='Log in ' />
                    </form>
                    <span>Or</span>
                    <span>Log in with Facebook</span>
                </TopBox>
                <BottomBox>
                    <span>Don't have an account?</span> <a href='#'>Sign up</a>
                </BottomBox>
            </Wrapper>
        </Container>
    );
};
export default Login;
