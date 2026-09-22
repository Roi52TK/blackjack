import { Card } from "./card";

export class Deck {
    constructor() {
        this.cards = [];

        for(let rank = 1; rank <= 13; rank++) {
            this.cards.push(new Card("spades", rank));
            this.cards.push(new Card("hearts", rank));
            this.cards.push(new Card("diamonds", rank));
            this.cards.push(new Card("clubs", rank));
        }
    }

    shuffle() {
        let currentIndex = this.cards.length;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.cards[currentIndex], this.cards[randomIndex]] = [
                this.cards[randomIndex], this.cards[currentIndex]];
        }
    }

    draw() {
        return this.cards.pop();
    }
}