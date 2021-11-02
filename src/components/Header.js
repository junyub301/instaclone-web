import { useReactiveVar } from "@apollo/client";
import { faCompass, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../screens/routes";
import Avatar from "./Avatar";
import Users from "./header/Users";

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

const Input = styled.input`
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    height: 28px;
    width: 215px;
    &::placeholder {
        align-items: center;
        text-align: center;
        font-size: 12px;
    }
`;

const UserContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border: 0px solid rgb(0, 0, 0);
    margin-left: -80px;
    top: 12px;
`;

const Arrow = styled.div`
    bottom: 0;
    top: -6px;
    left: 185.5px;
    background-color: rgba(var(--d87, 255, 255, 255), 1);
    border: 1px solid rgba(var(--f23, 255, 255, 255), 1);
    height: 14px;
    width: 14px;
    position: absolute;
    transform: rotate(45deg);
    box-shadow: 0 0 5px 1px rgba(var(--jb7, 0, 0, 0), 0.0975);
    line-height: 18px;
`;

function Header() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { data } = useUser();
    const { register, watch } = useForm({
        mode: "onChange",
        defaultValues: {
            username: "",
        },
    });
    const { username } = watch();

    const [toggleSearch, setToggleSearch] = useState(false);

    const el = useRef();
    const toggelSearch = (e) => {
        if (!toggleSearch && el.current.contains(e.target)) {
            setToggleSearch(true);
        } else {
            setToggleSearch(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", toggelSearch);
        return () => {
            window.removeEventListener("click", toggelSearch);
        };
    }, []);

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
                    <Input
                        {...register("username")}
                        type='text'
                        placeholder='검색'
                        autoComplete='off'
                        ref={el}
                    />
                    {toggleSearch ? (
                        <UserContainer>
                            <Arrow />
                            <Users username={username} />
                        </UserContainer>
                    ) : null}
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
