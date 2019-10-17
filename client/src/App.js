import React, { useEffect, useState } from "react";
import ChatMenu from "./components/ChatMenu.js";
import LogInForm from "./components/UserNameForm";
import { Link, Router, Route, Switch } from "react-router-dom";
import history from "./history";

function App() {
    return (
        <Router history={history}>
            <Switch>
                <div className="component">
                    <Route path="/" exact component={LogInForm} />
                    <Route path="/chat" exact component={ChatMenu} />
                </div>
            </Switch>
        </Router>
    );
}

export default App;
