import React, { useState } from "react";
import Card from "../customClasses/card/card";
import "./CardCell.css";

const CardCell: React.FC<{ card: Card }> = (card) => {
    const cardIn: Card = card.card;
    const [covered, setCovered] = useState(cardIn.isCovered());
    const [matched, setMatched] = useState(cardIn.getId() % 3 === 0);

    const handleClick = (event: React.MouseEvent): void => {
        event.preventDefault();
        if (!matched) {
            cardIn.toggleCovered();
            setCovered(cardIn.isCovered());
        }
    };

    return (
        <div
            className={[
                "card",
                covered ? "covered" : "uncovered",
                matched ? "matched" : "",
            ].join(" ")}
            onClick={handleClick}
        >
            {covered ? "" : cardIn.getSymbol()}
        </div>
    );
};

export default CardCell;
