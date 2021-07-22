import React from "react";
import Card from "../customClasses/card/card";
import "./CardCell.css";

interface Props {
    card: Card;
    clickHandler: (id: number) => void;
}

const CardCell: React.FC<Props> = (props) => {
    const clickHandlerIn = props.clickHandler;
    const cardIn: Card = props.card;

    return (
        <div
            className={[
                "card",
                cardIn.isCovered() ? "covered" : "uncovered",
                cardIn.isMatched() ? "matched" : "",
            ].join(" ")}
            onClick={() => {
                if (!cardIn.isMatched()) {
                    clickHandlerIn(cardIn.getId());
                }
            }}
        >
            {cardIn.isCovered() ? "" : cardIn.getSymbol()}
        </div>
    );
};

export default CardCell;
