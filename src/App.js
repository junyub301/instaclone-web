import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar, darkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./screens/routes";

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
            <Router>
                <Switch>
                    <Route path={routes.home} exact>
                        {isLoggedIn ? <Home /> : <Login />}
                    </Route>
                    {!isLoggedIn ? (
                        <Route path={routes.signUp}>
                            <SignUp />
                        </Route>
                    ) : null}

                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

// Switch를 사용하면 router가 한번에 하나만 render할수 있게 해준다.

export default App;
