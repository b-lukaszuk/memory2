import React, { useState } from "react";
import Card from "../customClasses/card/card";
import singlCardFactory from "../customClasses/card/cardFactory";
import CardCell from "./CardCell";

const GamePage: React.FC = () => {
    const cardFactory = singlCardFactory.getCardFactoryInstance();
    const [cards, setCards] = useState(cardFactory.getAllCards());

    return (
        <div>
            <h1>GamePage.tsx</h1>
            <ul className="cards">
                {cards.map((o) => <CardCell key={o.getId()} card={o} />)}
            </ul>

        </div>
    );
};

export default GamePage;
