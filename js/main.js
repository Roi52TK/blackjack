import { Controller } from "./controller.js";
import { Game } from "./game/game.js";
import { UI } from "./ui.js";

// Create and connect Game + UI -> Controller
function initialize() {
    const game = new Game();
    const ui = new UI();
    const controller = new Controller(game, ui);
    initButtons(controller);
}

// Add listeners to the buttons
function initButtons(controller) {
    const newGameBtn = document.getElementById("new-game-button");
    const hitBtn = document.getElementById("hit-button");
    const standBtn = document.getElementById("stand-button");

    newGameBtn.addEventListener("click", () => controller.startNewGame());
    hitBtn.addEventListener("click", () => controller.hit());
    standBtn.addEventListener("click", () => controller.stand());
}

initialize();