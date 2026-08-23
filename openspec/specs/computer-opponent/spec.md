# Computer Opponent Specification

## Purpose

Defines how the computer opponent behaves: when it moves, how strongly it plays, and the pacing of its turns.

## Requirements

### Requirement: Computer responds automatically to each human move
After every human move that does not already end the round, the computer SHALL place its mark in an empty cell without requiring any input.

#### Scenario: Computer answers the opening move
- **WHEN** the human places the first mark of a round
- **THEN** the computer places exactly one O in an empty cell without further input

#### Scenario: No response after round-ending human move
- **WHEN** the human's move completes a winning alignment or fills the board
- **THEN** the computer does not place another mark

### Requirement: Computer plays without losing
The computer SHALL select moves using an optimal strategy (minimax) such that, regardless of the human's play, no round ends in a computer loss.

#### Scenario: Immediate threat is blocked
- **WHEN** the human has two aligned marks with an empty third cell
- **THEN** the computer's next mark occupies that cell

#### Scenario: Available win is taken
- **WHEN** the computer has two aligned marks with an empty third cell
- **THEN** the computer's next mark occupies that winning cell

#### Scenario: Optimal play yields at worst a draw
- **WHEN** a full round is played from any reachable position
- **THEN** the outcome is never a computer loss

### Requirement: Computer turn is visibly paced
The computer's mark SHALL appear only after a short perceptible delay following the human's move, and the board SHALL not accept human input while it is the computer's turn.

#### Scenario: Human cannot move during computer turn
- **WHEN** the human attempts to activate a cell between their own move and the computer's response
- **THEN** no change occurs to the board
