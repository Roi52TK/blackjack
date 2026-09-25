import { Deck } from "./deck.js";
import { Hand } from "./hand.js";
import { GAME_STATE, GAME_RESULT } from "../constants.js";

export class Game {
    #deck;
    #playerHand;
    #dealerHand;
    #gameState;
    #gameResult;

    constructor() {
        this.#deck = new Deck();
        this.#playerHand = new Hand();
        this.#dealerHand = new Hand();
        this.#gameState = GAME_STATE.NOT_STARTED;
        this.#gameResult = GAME_RESULT.UNKNOWN;
    }

    #resetRound() {
        this.#deck = new Deck();
        this.#playerHand.clear();
        this.#dealerHand.clear();
    }

    startNew() {
        this.#resetRound();
        this.#deck.shuffle();
        this.#gameResult = GAME_RESULT.UNKNOWN;

        for(let i = 1; i <= 2; i++) {
            this.#playerHand.addCard(this.#deck.draw());
            this.#dealerHand.addCard(this.#deck.draw());
        }

        this.#processBlackjack();
    }

    #processBlackjack() {
        const isPlayerBlackjack = this.#playerHand.isBlackjack();
        const isDealerBlackjack = this.#dealerHand.isBlackjack();

        if(!isPlayerBlackjack && !isDealerBlackjack) {
            this.#gameState = GAME_STATE.PLAYER_TURN;
            return;
        }
        else if(isPlayerBlackjack && isDealerBlackjack) {
            this.#draw();
        }
        else if(isPlayerBlackjack){
            this.#playerWon();
        }
        else {
            this.#playerLost();
        }
    }

    hit() {
        if(this.#gameState !== GAME_STATE.PLAYER_TURN) {
            return;
        }

        const card = this.#deck.draw();
        this.#playerHand.addCard(card);

        if(this.#playerHand.isBust()) {
            this.#playerLost();
        }
        else if (this.#playerHand.getValue() === 21) {
            this.#gameState = GAME_STATE.DEALER_TURN;
        }

        return card;
    }

    stand() {
        if(this.#gameState === GAME_STATE.PLAYER_TURN) {
            this.#gameState = GAME_STATE.DEALER_TURN;
        }
    }

    playDealerTurn() {
        if(this.#gameState !== GAME_STATE.DEALER_TURN) {
            return;
        }

        if (this.#dealerHand.getValue() < 17) {
            const card = this.#deck.draw();
            this.#dealerHand.addCard(card);
            return card;
        }

        this.#compareHands();
    }

    #compareHands() {
        if (this.#dealerHand.isBust() || this.#dealerHand.getValue() < this.#playerHand.getValue()) {
            this.#playerWon();
        }
        else if (this.#dealerHand.getValue() > this.#playerHand.getValue()) {
            this.#playerLost();
        }
        else {
            this.#draw();
        }
    }

    #playerLost() {
        this.#gameResult = GAME_RESULT.PLAYER_LOST;
        this.#gameOver();
    }

    #playerWon() {
        this.#gameResult = GAME_RESULT.PLAYER_WON;
        this.#gameOver();
    }

    #draw() {
        this.#gameResult = GAME_RESULT.DRAW;
        this.#gameOver();
    }

    #gameOver() {
        this.#gameState = GAME_STATE.GAME_OVER;
    }

    get gameState() {
        return this.#gameState;
    }

    get gameResult() {
        return this.#gameResult;
    }

    get playerHand() {
        return this.#playerHand.getCards();
    }

    get dealerHand() {
        return this.#dealerHand.getCards();
    }

    get playerValue() {
        return this.#playerHand.getValue();
    }

    get dealerValue() {
        return this.#dealerHand.getValue();
    }
}