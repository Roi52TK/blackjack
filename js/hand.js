export class Hand {
    #cards;

    constructor() {
        this.#cards = [];
    }

    addCard(card) {
        this.#cards.push(card);
    }

    getCards() {
        return [...this.#cards];
    }

    getValue() {
        let value = 0;
        let acesCount = 0;

        this.#cards.forEach(card => {
            let cardValue;

            if(card.rank === 1) {
                acesCount++;
                cardValue = 11;
            }
            else if(card.rank >= 11) {
                cardValue = 10;
            }
            else {
                cardValue = card.rank;
            }

            value += cardValue;
        });

        while(value > 21 && acesCount > 0) {
            acesCount--;
            value -= 10;
        }

        return value;
    }

    isBust() {
        return this.getValue() > 21;
    }

    isBlackjack() {
        return this.#cards.length === 2 && this.getValue() === 21;
    }

    isEmpty() {
        return this.#cards.length === 0;
    }

    clear() {
        this.#cards = [];
    }
}