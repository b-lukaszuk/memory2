import React, { useState } from "react";
import Card from "../customClasses/card/card";
import singlCardFactory from "../customClasses/card/cardFactory";
import CardCell from "./CardCell";
import "./GamePage.css";
import Players from "./Players";
import { useParams } from "react-router-dom";

const GamePage: React.FC = () => {
    const cardFactory = singlCardFactory.getCardFactoryInstance();
    const [cards, setCards] = useState(cardFactory.getAllCards());
    let noOfPlayers: any = useParams();

    const toggleCardCover = (id: number) => {
        setCards(
            cards.map((c) => {
                if (c.getId() === id) {
                    c.toggleCovered();
                }
                return c;
            })
        );
    };

    return (
        <div>
            <h1>GamePage.tsx</h1>
            <Players noOfPlayers={noOfPlayers.noOfPlayers} />
            <div className="container">
                <div className="cards">
                    {cards.map((o) => (
                        <CardCell key={o.getId()} card={o} clickHandler={toggleCardCover} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamePage;
