import { isLoggedInVar } from "../apollo";
import styled, { css } from "styled-components";
import { useState } from "react";

const Title = styled.h1`
    color: ${(props) => (props.potato ? "palevioletred" : "beige")};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    ${(props) =>
        props.potato
            ? css`
                  font-size: 49px;
              `
            : css`
                  text-decoration: underline;
              `}
`;

const Container = styled.div`
    background-color: tomato;
`;

const TogglePotato = styled.button`
    color: red;
`;

const Login = () => {
    const [potato, setPotato] = useState(false);
    const togglePotatao = () => setPotato((current) => !current);
    return (
        <Container>
            <Title potato={potato}>Login</Title>
            <TogglePotato onClick={togglePotatao}>Toggle Potato</TogglePotato>
        </Container>
    );
};
export default Login;
