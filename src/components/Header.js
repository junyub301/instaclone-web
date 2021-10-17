import { useReactiveVar } from "@apollo/client";
import { faCompass, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../screens/routes";
import Avatar from "./Avatar";

const SHeader = styled.header`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.bgColor};
    /* padding: 18px 0px; */
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    max-width: 930px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
    margin-left: 15px;
`;

const Button = styled.span`
    background-color: ${(props) => props.theme.accent};
    border-radius: 4px;
    padding: 4px 15px;
    color: white;
    font-weight: 600;
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 103px;
    height: 48;
`;

function Header() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { data } = useUser();
    return (
        <SHeader>
            <Wrapper>
                <Column>
                    <Link to={"/"}>
                        <Logo src='/logo.png' />
                    </Link>
                    {/* <FontAwesomeIcon icon={faInstagram} size='2x' /> */}
                </Column>
                <Column>
                    {isLoggedIn ? (
                        <IconsContainer>
                            <Link to={routes.home}>
                                <FontAwesomeIcon icon={faHome} size='lg' />
                            </Link>
                            <Icon>
                                <FontAwesomeIcon icon={faCompass} size='lg' />
                            </Icon>
                            <Icon>
                                <Link to={`/users/${data?.me?.username}`}>
                                    <Avatar url={data?.me?.avatar} />
                                </Link>
                            </Icon>
                        </IconsContainer>
                    ) : (
                        <Link to={routes.home}>
                            <Button>Login</Button>
                        </Link>
                    )}
                </Column>
            </Wrapper>
        </SHeader>
    );
}

export default Header;
