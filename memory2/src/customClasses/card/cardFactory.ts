import Card from './card';
import randInt from '../../utils/randInt';

class CardFactory {
    // private _symbols: string[] = [
    //     '!',
    //     '@',
    //     '#',
    //     '$',
    //     '%',
    //     '^',
    //     '&',
    //     '*',
    //     '=',
    //     '+',
    //     '-',
    //     '~',
    // ];

    // used for testing
    private _symbols: string[] = [
        '!',
        '@',
        '#',
    ];
    private _cards: Card[] = [];

    public constructor() {
        for (let i = 0; i < this._symbols.length; i++) {
            // creates two cards of a kind
            this._cards.push(new Card(this._symbols[i]));
            this._cards.push(new Card(this._symbols[i]));
        }
    }

    private shuffleCards(): void {
        this._cards.sort(() => (Math.random() > 0.5) ? 1 : -1);
    }

    public getAllCards(): Card[] {
        this.shuffleCards();
        return this._cards;
    }
}

const singleton = (function() {
    let instance: CardFactory; // uninitialized so undefined

    function init() {
        return new CardFactory();
    }

    function getInstance() {
        if (!Boolean(instance)) {
            instance = init();
        }
        return instance;
    }

    return {
        getCardFactoryInstance: getInstance,
    };
})();

export default singleton;
