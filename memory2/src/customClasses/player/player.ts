class Player {

    private _id: number;
    private _name: string;
    private _onMove: boolean;
    private _points: number;
    static _counter: number = 0;

    public constructor() {
        this._id = Player._counter;
        Player._counter += 1;
        this._name = "Player " + (this._id + 1);
        this._onMove = this._id === 0 ? true : false;
        this._points = 0;
    }

    public getId(): number {
        return this._id;
    }

    public getName(): string {
        return this._name;
    }

    public getPoints(): number {
        return this._points;
    }

    public addPoints(howMany: number = 100): void {
        this._points += howMany;
    }

    public isOnMove(): boolean {
        return this._onMove;
    }

    public toggleOnMove(): void {
        this._onMove = !this._onMove;
    }

    public resetPlayerData(): void {
        this._points = 0;
        this._onMove = (this._id === 0 ? true : false);
    }
}

export default Player;
