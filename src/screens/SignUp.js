import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import BottomBox from "../components/auth/BottomBox";
import routes from "./routes";
import styled from "styled-components";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Subtitle = styled(FatLink)`
    font-size: 17px;
    text-align: center;
    margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String!
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ) {
            ok
            error
        }
    }
`;

function SignUp() {
    const history = useHistory();
    const onCompleted = (data) => {
        const { username, password } = getValues();
        const {
            createAccount: { ok, error },
        } = data;
        if (!ok) {
            return;
        }
        history.push(routes.home, {
            message: "Account created. Please log in",
            username,
            password,
        });
    };
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
    } = useForm({
        mode: "onChange",
    });
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        createAccount({
            variables: {
                ...data,
            },
        });
    };

    return (
        <AuthLayout>
            <PageTitle title='Sign up' />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size='3x' />
                    <Subtitle>
                        친구들의 사진과 동영상을 보려면 가입하세요.
                    </Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register("firstName", {
                            required: "First name is required",
                        })}
                        type='text'
                        placeholder='First Name'
                        required
                    />
                    <Input
                        {...register("lastName")}
                        type='text'
                        placeholder='Last Name'
                        required
                    />
                    <Input
                        {...register("email", {
                            required: "Email name is required",
                        })}
                        type='text'
                        placeholder='Email'
                        required
                    />
                    <Input
                        {...register("username", {
                            required: "Username name is required",
                        })}
                        type='text'
                        placeholder='Username'
                        required
                    />
                    <Input
                        {...register("password", {
                            required: "Password name is required",
                        })}
                        type='password'
                        placeholder='Password'
                        required
                    />
                    <Button
                        type='submit'
                        value={loading ? "Loading..." : "Sign up"}
                        disabled={!isValid || loading}
                    />
                </form>
            </FormBox>
            <BottomBox
                cta='Have an account?'
                linkText='Log in'
                link={routes.home}
            />
        </AuthLayout>
    );
}

export default SignUp;
