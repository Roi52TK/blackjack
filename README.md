# Blackjack

A browser-based Blackjack game built with vanilla JavaScript, HTML, and CSS.

The project was created as a learning project to practice JavaScript fundamentals, object-oriented programming, ES modules, DOM manipulation, UI design, and separation of game logic from presentation.

## Features

* Standard Blackjack gameplay
* Hit and Stand actions
* Dealer turn with standard drawing rules
* Blackjack detection
* Bust detection
* Automatic winner determination
* Ace value handling (`1` or `11`)
* Hidden dealer card
* Card suits and ranks
* Red and black card styling
* Animated card display
* Responsive layout for desktop and mobile
* Casino-inspired UI
* New Game functionality
* Game result messages

## How to Play

1. Start a new game.
2. The player and dealer are each dealt two cards.
3. One of the dealer's cards remains hidden.
4. During the player's turn:

   * **Hit** draws another card.
   * **Stand** ends the player's turn.
5. If the player reaches 21, the dealer's turn begins automatically.
6. The dealer reveals the hidden card and draws until reaching at least 17.
7. The hands are compared and the game result is displayed.

### Blackjack Rules

* Number cards are worth their face value.
* Jacks, Queens, and Kings are worth 10.
* Aces are worth 11 unless doing so would cause the hand to bust, in which case they are worth 1.
* A Blackjack is a two-card hand totaling 21.
* The dealer must draw while their hand value is below 17.
* A hand above 21 is a bust.

## Project Structure

```text
.
├── index.html
├── style.css
│
└── js/
    ├── main.js
    ├── constants.js
    ├── controller.js
    ├── ui.js
    │
    └── game/
        ├── card.js
        ├── deck.js
        ├── hand.js
        └── game.js
```

## Architecture

The project separates the game into several responsibilities instead of placing all of the logic inside a single JavaScript file.

### `Card`

Represents a single playing card.

A card contains:

* Rank
* Suit

The properties are encapsulated using JavaScript private fields and exposed through getters.

### `Deck`

Responsible for managing the deck of cards.

It handles:

* Creating a standard 52-card deck
* Shuffling
* Drawing cards

The deck does not know anything about the UI or how cards are displayed.

### `Hand`

Represents a collection of cards belonging to either the player or the dealer.

It handles:

* Adding cards
* Clearing cards
* Calculating hand value
* Detecting Blackjack
* Detecting busts

The Ace calculation is handled inside `Hand`, allowing the rest of the game to work with a simple hand-value interface.

### `Game`

Contains the actual Blackjack rules and game state.

It is responsible for:

* Starting a new round
* Managing the player and dealer hands
* Handling Hit and Stand
* Managing the dealer's turn
* Detecting Blackjack and busts
* Comparing the final hands
* Determining the game result
* Managing the current game state

The `Game` class has no knowledge of the DOM, CSS, animations, or delays.

This keeps the game rules independent from the presentation layer.

### `Controller`

Acts as the connection between the game logic and the UI.

It:

* Receives user actions
* Calls the appropriate `Game` methods
* Passes game results to the `UI`
* Controls the sequence of UI operations
* Handles asynchronous UI animations

For example, the dealer's turn is performed one card at a time by the controller. The controller asks the `Game` for the next card, tells the `UI` to display it, waits for the UI animation, and then continues the dealer's turn.

This allows the game logic to remain synchronous and independent of animation timing.

### `UI`

Responsible exclusively for the visual representation of the game.

It handles:

* Creating card elements
* Displaying cards
* Displaying hand values
* Hiding and revealing the dealer's card
* Displaying game results
* Clearing the previous round
* UI animations and visual effects

The UI receives game data from the controller instead of calculating game rules itself.

### `main.js`

The entry point of the application.

It creates and connects the main components:

```text
Game
  │
  ├── Controller
  │       │
  │       └── UI
  │
  └── Game Logic
```

It also registers the event listeners for the game buttons.

## Game Flow

A typical round follows this flow:

```text
New Game
    │
    ▼
Deal two cards to each player
    │
    ▼
Check for Blackjack
    │
    ├── Both Blackjack ──► Draw
    │
    ├── Player Blackjack ─► Player Wins
    │
    ├── Dealer Blackjack ─► Player Loses
    │
    ▼
Player Turn
    │
    ├── Hit
    │    │
    │    ├── Bust ───────► Player Loses
    │    │
    │    ├── 21 ─────────► Dealer Turn
    │    │
    │    └── Otherwise ──► Player Turn
    │
    └── Stand ───────────► Dealer Turn
                              │
                              ▼
                       Reveal hidden card
                              │
                              ▼
                       Dealer draws < 17
                              │
                              ▼
                       Compare hands
                              │
                              ▼
                          Game Over
```

## Technologies

* **HTML5** — page structure
* **CSS3** — styling, layout, responsive design, and animations
* **JavaScript (ES6+)** — game logic and application behavior
* **ES Modules** — separating the project into focused modules
* **DOM API** — creating and updating the game interface

No frameworks or external libraries are used.

## Design Decisions

### Separation of Logic and UI

One of the main goals of the project was to avoid coupling the Blackjack rules to the browser interface.

For example, `Game` does not directly manipulate DOM elements:

```text
Game
  └── Knows Blackjack rules

UI
  └── Knows how to display Blackjack

Controller
  └── Connects the two
```

This makes the individual components easier to understand, test, and modify.

### Hidden Dealer Card

The dealer's first card is still known to the `Game`.

"Hidden" is a presentation rule rather than a game-logic rule: the card is hidden from the player, not unknown to the game.

The `UI` therefore hides the card visually, while the `Game` continues to maintain the complete dealer hand.

### Controller and Animations

Animations are handled by the UI, but their timing is coordinated by the controller.

This is particularly useful during the dealer's turn. Instead of making the game logic wait for animations, the controller coordinates the sequence:

```text
Game → next card
       ↓
Controller
       ↓
UI → display card
       ↓
wait for animation
       ↓
Game → next card
```

This keeps presentation timing out of the game rules.

## Responsive Design

The interface is designed to work on both desktop and mobile screens.

The layout adapts at smaller screen widths by:

* Reducing card dimensions
* Adjusting spacing
* Scaling typography
* Making the controls responsive
* Adjusting the main game container

## Running the Project

Because the project uses JavaScript ES modules, it should be served through a local development server rather than opened directly as a `file://` page.

For example, using VS Code with the **Live Server** extension:

1. Open the project folder.
2. Start Live Server.
3. Open `index.html` through the local server.
4. Click **New Game** to start playing.

## Future Improvements

Possible future additions include:

* More polished card animations
* Improved card flip animation
* Sound effects
* Betting and chip system
* Player balance
* Multiple rounds
* Statistics
* Difficulty or rule variations
* Improved accessibility
* More advanced visual effects

## Credits

Made by **Roi The Knight**.

---

### Project Status

The core Blackjack gameplay and architecture are implemented. The project is currently focused on UI polish and animations.