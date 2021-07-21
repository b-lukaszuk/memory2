import React, { useState } from "react";
import Card from "../customClasses/card/card";
import singlCardFactory from "../customClasses/card/cardFactory";
import CardCell from "./CardCell";

const GamePage: React.FC = () => {
    const cardFactory = singlCardFactory.getCardFactoryInstance();

    const getAllCards = (): Card[] => {
        let numOfCardsInDeck = cardFactory.getNumOfCards();
        let theCards: Card[] = [];
        for (let i = 0; i < numOfCardsInDeck; i++) {
            theCards.push(cardFactory.getRandCard());
        }
        return theCards;
    };

    const [cards, setCards] = useState(getAllCards());

    const test: number[] = [1, 2, 3];
    const stuff = test.map((item) => <li key={item}>{item}</li>);
    console.log(stuff);

    console.log(cards);
    console.log(cards.length);

    console.log(cards.length);
    return (
        <div>
            <h1>GamePage.tsx</h1>
            <p>tu powinna byc karta</p>
            {(cards.length === 0) + ""}
            <ul>{stuff}</ul>
            {test.length}
        </div>
    );
};

export default GamePage;
