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
    const [players, setPlayers] = useState(playerFactory.getAllPlayers());

    const addPtsToPlayerOnMove = () => {
        setPlayers(
            players.map((p) => {
                if (p.isOnMove()) {
                    p.addPoints();
                }
                return p;
            })
        );
    };

    const togglePlayerOnMove = (id: number) => {
        setPlayers(
            players.map((p) => {
                if (p.getId() === id) {
                    p.toggleOnMove();
                }
                return p;
            })
        );
    };

    const moveToNextPlayer = () => {
        let playerOnMove: Player = players.filter((p) => {
            if (p.isOnMove()) {
                return p;
            }
        })[0];
        let idOnMove: number = playerOnMove.getId();
        togglePlayerOnMove(idOnMove);
        if (idOnMove + 1 === players.length) {
            togglePlayerOnMove(0);
        } else {
            togglePlayerOnMove(idOnMove + 1);
        }
    };

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
            addPtsToPlayerOnMove();
        }
        if (
            uncovCards.length === 2 &&
            uncovCards[0].getSymbol() !== uncovCards[1].getSymbol()
        ) {
            setTimeout(() => {
                toggleCardCover(uncovCards[0].getId());
                toggleCardCover(uncovCards[1].getId());
                moveToNextPlayer();
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
