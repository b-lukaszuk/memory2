import React, { useState } from "react";
import Card from "../customClasses/card/card";
import singlCardFactory from "../customClasses/card/cardFactory";
import CardCell from "./CardCell";
import "./GamePage.css";
import Players from "./Players";
import { useParams } from "react-router-dom";
import Player from "../customClasses/player/player";
import singlPlayerFactory from "../customClasses/player/playerFactory";

const GamePage: React.FC = () => {
    const cardFactory = singlCardFactory.getCardFactoryInstance();
    const [cards, setCards] = useState(cardFactory.getAllCards());

    let noOfPlayers: any = useParams();
    const playerFactory = singlPlayerFactory.getPlayerFactoryInstance(
        noOfPlayers.noOfPlayers
    );
    const players: Player[] = playerFactory.getAllPlayers();

    const toggleCardCover = (id: number) => {
        setCards(
            cards.map((c) => {
                if (c.getId() === id) {
                    c.toggleCovered();
                }
                return c;
            })
        );
        let uncovCards: Card[] = cards.filter((c) => {
            if (!c.isCovered()) {
                return c;
            }
        });
        if (
            uncovCards.length === 2 &&
            uncovCards[0].getSymbol() === uncovCards[1].getSymbol()
        ) {
            toggleCardCover(uncovCards[0].getId());
            setCardToMatched(uncovCards[0].getId());
            toggleCardCover(uncovCards[1].getId());
            setCardToMatched(uncovCards[1].getId());
        }
        if (
            uncovCards.length === 2 &&
            uncovCards[0].getSymbol() !== uncovCards[1].getSymbol()
        ) {
            setTimeout(() => {
                toggleCardCover(uncovCards[0].getId());
                toggleCardCover(uncovCards[1].getId());
            }, 2000);
        }
    };

    const setCardToMatched = (id: number) => {
        setCards(
            cards.map((c) => {
                if (c.getId() === id) {
                    c.toggleMatched();
                }
                return c;
            })
        );
    };

    return (
        <div>
            <h1>GamePage.tsx</h1>
            <Players players={players} />
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
