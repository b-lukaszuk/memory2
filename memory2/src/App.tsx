import React from 'react';
import LandingPage from "./components/LandingPage";
import GamePage from "./components/GamePage";
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route exact path="/gamePage">
                    <GamePage />
                </Route>
                <Route path="*">{() => "404 NOT FOUND"}</Route>
            </Switch>
        </Router>
    );
}

export default App;
