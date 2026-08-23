# Match Experience Specification

## Purpose

Defines the observable experience around matches: status messaging, scorekeeping, reset controls, and the interface quality floor (responsiveness, keyboard access, motion).

## Requirements

### Requirement: Status always names the current state
The interface SHALL continuously display a status message identifying whose turn it is during play, and SHALL announce the round outcome (human wins, computer wins, or draw) when a round ends.

#### Scenario: Turn indicator tracks play
- **WHEN** it is the human's turn
- **THEN** the status identifies that it is the human's move, and switches to the computer while the computer responds

#### Scenario: Outcome is announced at round end
- **WHEN** a round ends in any outcome
- **THEN** the status states that specific outcome

### Requirement: Score persists across rounds within a session
The system SHALL keep a running tally of rounds won by the human, won by the computer, and drawn, carrying it across consecutive rounds until scores are explicitly cleared or the page is reloaded.

#### Scenario: Tally updates after each round
- **WHEN** a round ends with an outcome
- **THEN** the corresponding tally count increases by one and other counts are unchanged

### Requirement: Controls for new round and score reset
The system SHALL provide controls to start a new round (available during play) and to clear the running score. Clearing the score MUST NOT alter the current board position.

#### Scenario: New round keeps the tally
- **WHEN** the human starts a new round mid-game or after a finished round
- **THEN** the board empties but all tally counts remain as they were

#### Scenario: Score reset clears only the tally
- **WHEN** the human activates the score-reset control
- **THEN** all tally counts return to zero while the board position is unchanged

### Requirement: Interface adapts from mobile to desktop widths
The game interface SHALL remain fully usable — board visible without scrolling off-screen and controls reachable — from approximately 360px viewport width through desktop sizes.

#### Scenario: Small-viewport layout remains usable
- **WHEN** the page is viewed at a 360px-wide viewport
- **THEN** the board, status, and controls are fully visible and operable without horizontal overflow

### Requirement: Board is keyboard accessible
Every playable cell SHALL be reachable and activatable via keyboard, with a clearly visible focus indicator; cell focus order SHALL follow reading order of the grid.

#### Scenario: Keyboard-only move
- **WHEN** the human navigates cells using only the keyboard and activates one on their turn
- **THEN** their mark is placed exactly as if activated by pointer

### Requirement: Motion respects reduced-motion preference
All non-essential animation (mark draw-in, winning-line strike, ambient effects) SHALL be suppressed or replaced by instant state changes when the user prefers reduced motion.

#### Scenario: Marks appear instantly under reduced motion
- **WHEN** the operating system reports prefers-reduced-motion and marks are placed
- **THEN** marks appear without write-on or strike-through animation
