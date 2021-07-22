import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GamePage from "./components/GamePage";
import LandingPage from "./components/LandingPage";

import "./App.css";

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route exact path="/gamePage/:noOfPlayers">
                    <GamePage />
                </Route>
                <Route path="*">{() => "404 NOT FOUND"}</Route>
            </Switch>
        </Router>
    );
};

export default App;
