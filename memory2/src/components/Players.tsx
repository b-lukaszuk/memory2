import React from "react";
import Player from "../customClasses/player/player";
import singlPlayerFactory from "../customClasses/player/playerFactory";
import "./Players.css";


const Players: React.FC<{ noOfPlayers: number }> = (noOfPlayers) => {

    const noOfPlayersIn = noOfPlayers.noOfPlayers;
    const playerFactory = singlPlayerFactory.getPlayerFactoryInstance(noOfPlayersIn);
    const players: Player[] = playerFactory.getAllPlayers();
    const playerData = players.map((p) => {
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
            <p>No of players: {players.length}</p>
            <table>
                <tbody>
                    {playerData}
                </tbody>
            </table>
        </div >
    );
};

export default Players;
