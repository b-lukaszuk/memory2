import React from 'react';
import LandingPage from "./components/LandingPage";
import GamePage from "./components/GamePage";
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>App.tsx</h1>
            <LandingPage />
            <GamePage />
        </div>
    );
}

export default App;
