import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LandingPage: React.FC = () => {
    let [noOfPlayers, setNoOfPlayers] = useState(2);
    const history = useHistory();

    const handleChoice = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setNoOfPlayers(parseInt(event.target.value));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        history.replace(`/gamePage/${noOfPlayers}`);
    };

    return (
        <div>
            <h1>Game description</h1>
            <p>
                You will see a set of cards with hidden symbols
                <br />
                Click on the card to see the symbol
                <br />
                Click on another card with a symbol the same that You previously
                discovered
                <br />
                Once a pair of cards with the same symbol is revealed, the cards are
                removed and the player gets the points (player gets next move in the
                same round)
                <br />
                The game ends when all the cards are paired <br />
                The players take turns to reveal the cards
                <br />
            </p>
            <form onSubmit={handleSubmit}>
                <label>Choose number of (human) players</label>
                &nbsp; &nbsp;
                <select value={noOfPlayers} onChange={handleChoice}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <br /> <br />
                <input type="submit" value="Go To the Game" />
            </form>

        </div>
    );
};

export default LandingPage;
