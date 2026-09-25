export class Card {
    #suit;
    #rank;

    constructor(suit, rank) {
        this.#suit = suit;
        this.#rank = rank;
    }

    get suit() {
        return this.#suit;
    }

    get rank() {
        return this.#rank;
    }
}