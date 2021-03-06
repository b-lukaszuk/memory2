import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../customClasses/card/card";
import CardCell from "./CardCell";
import Player from "../customClasses/player/player";
import Players from "./Players";
import singlCardFactory from "../customClasses/card/cardFactory";
import singlPlayerFactory from "../customClasses/player/playerFactory";
import Button from "./Button";

import "./GamePage.css";

const GamePage: React.FC = () => {
    ///////////////////////////////////////////////////////////////////////////
    //                      players and their functions                      //
    ///////////////////////////////////////////////////////////////////////////
    // consider using useReducer for players
    let noOfPlayers: any = useParams();
    const playerFactory = singlPlayerFactory.getPlayerFactoryInstance(
        noOfPlayers.noOfPlayers
    );
    const players = playerFactory.getAllPlayers();
    const [gameOver, setGameOver] = useState(false);

    const getWinnerName = (): string => {
        let theMax: number = Math.max(...players.map((p) => {
            return p.getPoints();
        }))
        let winners: string[] = players.filter((p) => {
            return p.getPoints() === theMax;
        }).map((p) => {
            return p.getName();
        });
        return winners.join(", ");
    }

    const addPtsToPlayerOnMove = (): void => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].isOnMove()) {
                players[i].addPoints();
            }
        }
    };

    const togglePlayerOnMove = (playerId: number): void => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].getId() === playerId) {
                players[i].toggleOnMove();
            }
        }
    };

    const moveToNextPlayer = (): void => {
        let idOnMove: number = 0;
        for (let i = 0; i < players.length; i++) {
            if (players[i].isOnMove()) {
                idOnMove = players[i].getId();
            }
        }
        togglePlayerOnMove(idOnMove);
        if (idOnMove + 1 === players.length) {
            togglePlayerOnMove(0);
        } else {
            togglePlayerOnMove(idOnMove + 1);
        }
    };

    ///////////////////////////////////////////////////////////////////////////
    //                       cards and their functions                       //
    ///////////////////////////////////////////////////////////////////////////
    // consider using useReducer for cards
    const cardFactory = singlCardFactory.getCardFactoryInstance();
    const [cards, setCards] = useState(cardFactory.getAllCards());

    // can click on other card or need to wait for player to finish turn
    const [canClickOnCard, setCanClickOnCard] = useState(true);

    const toggleCardCover = (cardId: number): void => {
        setCards(
            cards.map((c) => {
                if (c.getId() === cardId) {
                    c.toggleCovered();
                }
                return c;
            })
        );
    };

    const toggleCardMatched = (id: number): void => {
        setCards(
            cards.map((c) => {
                if (c.getId() === id) {
                    c.toggleMatched();
                }
                return c;
            })
        );
    };

    const getUncoveredCards = (): Card[] => {
        return cards.filter((c) => {
            return !c.isCovered();
        });
    };

    const isGameOver = (): boolean => {
        let sum: number = 0;
        for (let i = 0; i < players.length; i++) {
            sum += players[i].getPoints();
        }
        return (sum === 1200 ? true : false);
    }

    const handleCardClick = (cardId: number): void => {
        if (canClickOnCard) {
            toggleCardCover(cardId);
            let uncovCards: Card[] = getUncoveredCards();

            if (uncovCards.length === 2) {
                if (uncovCards[0].getSymbol() === uncovCards[1].getSymbol()) {
                    toggleCardMatched(uncovCards[0].getId());
                    toggleCardMatched(uncovCards[1].getId());
                    setCanClickOnCard(false);
                    setTimeout(() => {
                        uncovCards.forEach((c) => {
                            toggleCardCover(c.getId());
                        });
                        setCanClickOnCard(true);
                    }, 1000);
                    addPtsToPlayerOnMove();
                } else {
                    setCanClickOnCard(false);
                    setTimeout(() => {
                        uncovCards.forEach((c) => {
                            toggleCardCover(c.getId());
                        });
                        moveToNextPlayer();
                        setCanClickOnCard(true);
                    }, 2000);
                }
            }
        }
        if (isGameOver()) {
            setGameOver(true);
        }
    };

    const resetForNewGame = (): void => {
        for (let i = 0; i < players.length; i++) {
            players[i].resetPlayerData();
        }
        setGameOver(false);
        setCards(cardFactory.getAllCards());
        for (let i = 0; i < cards.length; i++) {
            cards[i].resetCardData();
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    //                              render stuff                             //
    ///////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <h1>Memory game</h1>
            <Players players={players} />
            <span>Game status: {gameOver ? 'Game Over. ' : 'In progress'}</span>
            {gameOver && <span>Winner(s): {getWinnerName()}!</span>}
            <br /> <br />
            <Button className='normalBut'
                onClick={resetForNewGame} btnText='new game' />
            <div className="container">
                <div className="cards">
                    {cards.map((o) => (
                        <CardCell
                            key={o.getId()} card={o}
                            clickHandler={handleCardClick} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamePage;
