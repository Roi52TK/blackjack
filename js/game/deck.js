import { Card } from "./card.js";
import { CARD_SUIT } from "../constants.js";

export class Deck {
    #cards;

    constructor() {
        this.#cards = [];

        for(let rank = 1; rank <= 13; rank++) {
            this.#cards.push(new Card(CARD_SUIT.SPADES, rank));
            this.#cards.push(new Card(CARD_SUIT.HEARTS, rank));
            this.#cards.push(new Card(CARD_SUIT.DIAMONDS, rank));
            this.#cards.push(new Card(CARD_SUIT.CLUBS, rank));
        }
    }

    shuffle() {
        let currentIndex = this.#cards.length;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.#cards[currentIndex], this.#cards[randomIndex]] = [
                this.#cards[randomIndex], this.#cards[currentIndex]];
        }
    }

    draw() {
        return this.#cards.pop();
    }
}