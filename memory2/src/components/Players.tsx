import React from "react";
import Player from "../customClasses/player/player";
import singlPlayerFactory from "../customClasses/player/playerFactory";
import "./Players.css";

interface Props {
    players: Player[];
}


const Players: React.FC<Props> = (props) => {

    const playersIn = props.players;
    const playerData = playersIn.map((p) => {
        return (
            <tr key={p.getId()} className={p.getOnMove() ? 'onMove' : ''}>
                <td>
                    {p.getName()} : {p.getPoints()}
                </td>
            </tr>
        )
    })

    return (
        <div>
            <p>No of players: {playersIn.length}</p>
            <table>
                <tbody>
                    {playerData}
                </tbody>
            </table>
        </div >
    );
};

export default Players;
