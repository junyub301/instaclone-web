import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar, darkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";

const lightTheme = {
    fontColor: "#2c2c2c",
    bgColor: "lightgray",
};

const darkTheme = {
    fontColor: "lightgray",
    bgColor: "#2c2c2c",
};

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Router>
                <Switch>
                    <Route path='/' exact>
                        {isLoggedIn ? <Home /> : <Login />}
                    </Route>
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
