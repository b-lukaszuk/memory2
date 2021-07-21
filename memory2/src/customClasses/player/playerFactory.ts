import Player from "./player";

class PlayerFactory {

    private _players: Player[] = [];

    public constructor(howMany: number) {
        for (let i = 0; i < howMany; i++) {
            this._players.push(new Player());
        }
    }

    public getAllPlayers(): Player[] {
        return this._players;
    }
}

const singleton = (function() {
    let instance: PlayerFactory; // uninitialized so undefined

    function init(noOfPlayers: number) {
        return new PlayerFactory(noOfPlayers);
    }

    function getInstance(noOfPlayers: number) {
        if (!Boolean(instance)) {
            instance = init(noOfPlayers);
        }
        return instance;
    }

    return {
        getPlayerFactoryInstance: getInstance,
    };
})();

export default singleton;
