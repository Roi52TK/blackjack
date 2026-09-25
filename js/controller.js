import { Game } from "./game.js";
import { GAME_STATE } from "./constants.js";

export class Controller {
    #game;
    #ui;

    constructor(game, ui) {
        this.#game = game;
        this.#ui = ui;
    }

    async startNewGame() {
        this.#game.startNew();

        await this.#ui.displayNewGame(this.#game.playerHand, this.#game.dealerHand);

        if (this.#game.gameState === GAME_STATE.GAME_OVER) {
            await this.#ui.revealDealerCard();
            await this.#ui.displayGameOver(this.#game.gameResult);
        }
    }

    async hit() {
        if(this.#game.gameState !== GAME_STATE.PLAYER_TURN) {
            return;
        }

        const card = this.#game.hit();

        await this.#ui.displayPlayerCard(card);

        if (this.#game.gameState === GAME_STATE.DEALER_TURN) {
            await this.#playDealerTurn();
        }
        else if (this.#game.gameState === GAME_STATE.GAME_OVER) {
            await this.#ui.displayGameOver(this.#game.gameResult);
        }
    }

    async stand() {
        this.#game.stand();

        if (this.#game.gameState === GAME_STATE.DEALER_TURN) {
            await this.#playDealerTurn();
        }
    }

    async #playDealerTurn() {
        await this.#ui.revealDealerCard();

        while (this.#game.gameState === GAME_STATE.DEALER_TURN) {
            const card = this.#game.playDealerTurn();

            if (card) {
                await this.#ui.displayDealerCard(card);
            }
        }

        await this.#ui.displayGameOver(this.#game.gameResult);
    }

    getPlayerValue() {
        return this.#game.playerValue;
    }

    getDealerValue() {
        return this.#game.dealerValue;
    }
}