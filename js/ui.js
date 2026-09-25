import { GAME_RESULT, CARD_SUIT } from "./constants.js";

export class UI {
    #dealerCards;
    #dealerHiddenCard;
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

    async displayNewGame(playerHand, dealerHand, playerValue) {
        const playerCard1 = this.#createCard(playerHand[0]);
        await this.#displayCard(playerCard1, this.#playerCards);

        const dealerHiddenCard = this.#createCard(dealerHand[0]);
        this.#setCardHidden(dealerHiddenCard); // Dealer's hidden card
        this.#dealerHiddenCard = dealerHiddenCard;
        await this.#displayCard(dealerHiddenCard, this.#dealerCards);

        const playerCard2 = this.#createCard(playerHand[1]);
        await this.#displayCard(playerCard2, this.#playerCards);

        const dealerVisibleCard = this.#createCard(dealerHand[1]);
        await this.#displayCard(dealerVisibleCard, this.#dealerCards);

        // Show player's hand value and "?"" for dealer
        this.#playerValue.textContent = playerValue;
        this.#dealerValue.textContent = "?";
    }

    async displayPlayerCard(card, playerValue) {
        const cardDOM = this.#createCard(card);
        await this.#displayCard(cardDOM, this.#playerCards);

        // Update player's hand value
        this.#playerValue.textContent = playerValue;
    }

    async revealDealerCard(dealerValue) {
        // Flip card animation

        // Remove "hidden-card" class from #dealerHiddenCard mid-animation
        this.#dealerHiddenCard.classList.remove("hidden-card");

        setTimeout(() => { }, 500); // Delay for testing

        // Show dealer's hand value
        this.#dealerValue.textContent = dealerValue;
    }

    async displayDealerCard(card, dealerValue) {
        const cardDOM = this.#createCard(card);
        await this.#displayCard(cardDOM, this.#dealerCards);

        // Update dealer's hand value
        this.#dealerValue.textContent = dealerValue;
    }

    async displayGameOver(gameResult) {
        
    }

    async #displayCard(cardDOM, container) {
        container.appendChild(cardDOM);
        setTimeout(() => { }, 500); // Delay for testing
    }

    #setCardHidden(cardDOM) {
        cardDOM.classList.add("hidden-card");
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