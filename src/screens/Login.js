import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import routes from "./routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const Login = () => {
    return (
        <AuthLayout>
            <PageTitle title='Login' />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size='3x' />
                </div>
                <form>
                    <Input type='text' placeholder='Username' required />
                    <Input type='password' placeholder='Password' />
                    <Button type='submit' value='Log in' />
                </form>
                <Separator />

                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                link={routes.signUp}
                linkText='Sign up'
            />
        </AuthLayout>
    );
};
export default Login;
