import React from "react";

import Player from "../customClasses/player/player";

import "./Players.css";

interface Props {
    players: Player[];
}

const Players: React.FC<Props> = (props) => {

    const playersIn = props.players;
    const playerData = playersIn.map((p) => {
        return (
            <tr key={p.getId()} className={p.isOnMove() ? 'onMove' : ''}>
                <td>
                    {p.getName()} : {p.getPoints() + " pts"}
                </td>
            </tr>
        )
    })

    return (
        <div className="players">
            <table>
                <tbody>
                    {playerData}
                </tbody>
            </table>
        </div >
    );
};

export default Players;
