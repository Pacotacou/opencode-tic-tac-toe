# Game Play Specification

## Purpose

Defines the rules of tic tac toe as enforced by the game: how the board accepts moves, how turns alternate, and how rounds are decided and cleared.

## Requirements

### Requirement: Board presents nine playable cells
The system SHALL present a 3x3 grid of nine cells and SHALL accept a human move only in an empty cell.

#### Scenario: Mark placed in empty cell
- **WHEN** the human activates an empty cell on their turn
- **THEN** their mark appears in that cell

#### Scenario: Occupied cell rejects placement
- **WHEN** the human activates a cell that already contains a mark
- **THEN** no change occurs to the board

### Requirement: Turns alternate between human and computer
The human SHALL always hold the first move of a round playing as X, and the computer SHALL play as O responding after each human move. A cell SHALL be playable by the human only while it is the human's turn.

#### Scenario: Round opens on the human's turn
- **WHEN** a new round begins
- **THEN** the board is empty, it is the human's turn, and activating any cell places an X

### Requirement: Three aligned marks end the round as a win
When either player holds three collinearly adjacent marks (any row, any column, or either diagonal), the system SHALL end the round immediately and identify that player as the winner.

#### Scenario: Row or column completion wins
- **WHEN** a player's third mark completes an alignment along a row or column
- **THEN** the round ends with that player declared the winner

#### Scenario: Diagonal completion wins
- **WHEN** a player's third mark completes an alignment along a main diagonal
- **THEN** the round ends with that player declared the winner

### Requirement: Full board without alignment ends the round as a draw
If all nine cells are filled and no player has three aligned marks, the system SHALL end the round as a draw.

#### Scenario: Board fills with no winner
- **WHEN** the ninth mark is placed and no three marks align
- **THEN** the round ends declared as a draw

### Requirement: Ended rounds lock the board
Once a round has ended in a win or draw, the board SHALL accept no further moves until a new round starts.

#### Scenario: Post-win clicks are inert
- **WHEN** the round has ended and the human activates any cell
- **THEN** the board state does not change

### Requirement: Starting a new round clears the board
The system SHALL offer a way to start a new round that empties the board, restores X-to-the-human as first turn, and preserves the running score.

#### Scenario: New round after a finished game
- **WHEN** the human starts a new round after a round has ended
- **THEN** the board is empty and it is the human's turn again
