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
import { useState } from "react";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const onUsernameChange = (event) => {
    const {
      target: { value },
    } = event;
    setUsernameError("");
    setUsername(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "") {
      setUsernameError("Not empty pls.");
    }
    if (username.length < 10) {
      setUsernameError("too short");
    }
  };

  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit}>
          {usernameError}
          <Input
            value={username}
            onChange={onUsernameChange}
            type="text"
            placeholder="Username"
            required
          />
          <Input type="password" placeholder="Password" />
          <Button
            type="submit"
            value="Log in"
            disabled={username === "" && username.length < 10}
          />
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
        linkText="Sign up"
      />
    </AuthLayout>
  );
};
export default Login;
