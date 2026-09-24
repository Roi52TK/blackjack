import { Deck } from "./deck";
import { Hand } from "./hand";

export const GAME_STATE = {
    NOT_STARTED: 0,
    PLAYER_TURN: 1,
    DEALER_TURN: 2,
    GAME_OVER: 3
};

export const GAME_RESULT = {
    UNKNOWN: 0,
    PLAYER_LOST: 1,
    PLAYER_WON: 2,
    DRAW: 3
};

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

        this.#playerHand.addCard(this.#deck.draw());

        if(this.#playerHand.isBust()) {
            this.#playerLost();
        }
        else if (this.#playerHand.getValue() === 21) {
            this.#gameState = GAME_STATE.DEALER_TURN;
        }
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
            this.#dealerHand.addCard(this.#deck.draw());
        }
        else {
            this.#compareHands();
        }
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
}