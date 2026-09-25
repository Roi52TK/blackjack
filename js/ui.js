import { GAME_RESULT, CARD_SUIT } from "./constants.js";

export class UI {
    #dealerCards;
    #playerCards;
    #dealerValue;
    #playerValue;
    #gameMessage;

    constructor() {
        this.#dealerCards = document.getElementById("dealer-cards");
        this.#playerCards = document.getElementById("player-cards");
        this.#dealerValue = document.getElementById("dealer-value");
        this.#playerValue = document.getElementById("player-value");
        this.#gameMessage = document.getElementById("game-message");
    }

    async displayNewGame(playerHand, dealerHand) {

    }

    async displayPlayerCard(card) {
        const cardDiv = this.#createCard(card);

        this.#playerCards.appendChild(cardDiv);
        
        setTimeout(() => {}, 500); // Delay for testing
    }

    async displayDealerCard(card) {
        const cardDiv = this.#createCard(card);

        this.#dealerCards.appendChild(cardDiv);

        setTimeout(() => { }, 500); // Delay for testing
    }

    async displayGameOver(gameResult) {
        
    }

    #createCard(card) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        const cardCornerTop = document.createElement("div");
        cardCornerTop.classList.add("card-corner", "top");

        const cardRankTop = document.createElement("span");
        cardRankTop.classList.add("card-rank");

        const cardSuitTop = document.createElement("span");
        cardSuitTop.classList.add("card-suit");

        const cardCenter = document.createElement("div");
        cardCenter.classList.add("card-center");

        const cardCornerBottom = document.createElement("div");
        cardCornerBottom.classList.add("card-corner", "bottom");

        const cardRankBottom = document.createElement("span");
        cardRankBottom.classList.add("card-rank");

        const cardSuitBottom = document.createElement("span");
        cardSuitBottom.classList.add("card-suit");

        cardCornerTop.append(cardRankTop, cardSuitTop);
        cardCornerBottom.append(cardRankBottom, cardSuitBottom);

        cardDiv.append(cardCornerTop, cardCenter, cardCornerBottom);

        const rank = this.#getRankText(card.rank);
        const suit = this.#getSuitIcon(card.suit);

        cardRankTop.textContent = rank;
        cardSuitTop.textContent = suit;

        cardRankBottom.textContent = rank;
        cardSuitBottom.textContent = suit;

        cardCenter.textContent = suit;

        return cardDiv;
    }

    #getRankText(rank) {
        let rankText;
        switch (rank) {
            case 1:
                rankText = "A";
                break;
            case 11:
                rankText = "J";
                break;
            case 12:
                rankText = "Q";
                break;
            case 13:
                rankText = "K";
                break;
            default:
                rankText = rank;
        }

        return rankText;
    }

    #getSuitIcon(suit) {
        let suitIcon;
        switch (suit) {
            case CARD_SUIT.SPADES:
                suitIcon = "♠";
                break;
            case CARD_SUIT.HEARTS:
                suitIcon = "♥";
                break;
            case CARD_SUIT.DIAMONDS:
                suitIcon = "♦";
                break;
            case CARD_SUIT.CLUBS:
                suitIcon = "♣";
                break;
            default:
                suitIcon = "E"; // For error
        }

        return suitIcon;
    }
}