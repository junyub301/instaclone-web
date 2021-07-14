import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import Layout from "./components/Layout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Profile from "./screens/Profile";
import routes from "./screens/routes";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);

    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <Router>
                        <Switch>
                            <Route path={routes.home} exact>
                                {isLoggedIn ? (
                                    <Layout>
                                        <Home />
                                    </Layout>
                                ) : (
                                    <Login />
                                )}
                            </Route>
                            {!isLoggedIn ? (
                                <Route path={routes.signUp}>
                                    <SignUp />
                                </Route>
                            ) : null}
                            <Route path={`/users/:username`}>
                                <Profile />
                            </Route>
                            <Route>
                                <NotFound />
                            </Route>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </HelmetProvider>
        </ApolloProvider>
    );
}

// Switch를 사용하면 router가 한번에 하나만 render할수 있게 해준다.

export default App;
