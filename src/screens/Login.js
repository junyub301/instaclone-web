import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import routes from "./routes";
import { useLocation } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const Notification = styled.div`
    color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;

const Login = () => {
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        setError,
        clearErrors,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            username: location?.state?.username || "",
            password: location?.state?.password || "",
        },
    });

    const onCompleted = (data) => {
        const {
            login: { ok, error, token },
        } = data;
        if (!ok) {
            return setError("result", {
                message: error,
            });
        }
        if (token) {
            logUserIn(token);
        }
    };

    const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        const { username, password } = getValues();
        login({
            variables: { username, password },
        });
    };

    const clearLoginError = () => {
        clearErrors("result");
    };

    return (
        <AuthLayout>
            <PageTitle title='Login' />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size='3x' />
                </div>
                <Notification>{location?.state?.message}</Notification>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message:
                                    "Username should be loger than 5 chars.",
                            },
                        })}
                        onFocus={clearLoginError}
                        type='text'
                        placeholder='Username'
                        hasError={Boolean(errors?.username?.message)}
                    />
                    <FormError message={errors?.username?.message} />
                    <Input
                        {...register("password", {
                            required: "Password is required",
                        })}
                        onFocus={clearLoginError}
                        type='password'
                        placeholder='Password'
                        hasError={Boolean(errors?.password?.message)}
                    />
                    <FormError message={errors?.password?.message} />
                    <Button
                        type='submit'
                        value={loading ? "Loading..." : "Log in"}
                        disabled={!isValid || loading}
                    />

                    <FormError message={errors?.result?.message} />
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
