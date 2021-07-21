import React, { useState } from "react";
import Card from "../customClasses/card/card";
import singlCardFactory from "../customClasses/card/cardFactory";
import CardCell from "./CardCell";
import "./GamePage.css";

const GamePage: React.FC = () => {
    const cardFactory = singlCardFactory.getCardFactoryInstance();
    const [cards, setCards] = useState(cardFactory.getAllCards());

    return (
        <div>
            <h1>GamePage.tsx</h1>
            <div className="container">
                <div className="cards">
                    {cards.map((o) => <CardCell key={o.getId()} card={o} />)}
                </div>
            </div>
        </div>
    );
};

export default GamePage;
