import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        {isLoggedIn ? <Home /> : <Login />}
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

// Switch를 사용하면 router가 한번에 하나만 render할수 있게 해준다.

export default App;
