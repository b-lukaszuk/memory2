import React from 'react';
import Card from "../customClasses/card/card";

const CardCell: React.FC<{ card: Card }> = (card) => {

    const cardIn: Card = card.card;
    console.log("received card to render");

    return (
        <li>
            {cardIn.getId()} - {cardIn.getSymbol()}
        </li>
    );
}

export default CardCell;
