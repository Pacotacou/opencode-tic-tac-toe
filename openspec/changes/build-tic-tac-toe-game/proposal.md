## Why

The repository is empty and its purpose is to deliver a playable tic tac toe game. Building it as a single-page web app gives an immediately playable product with zero backend, while serving as the foundation of the repo.

## What Changes

- Scaffold a new React + Vite single-page application in the repository root (no build tooling exists today).
- Implement tic tac toe on a 3x3 board: the human plays against the computer only (no local two-player mode).
- Add a computer opponent that never loses (minimax perfect play) and responds automatically after each human move.
- Add match-level experience: turn/outcome status messaging, running score across rounds, new-round and reset controls.
- Apply a distinctive, subject-grounded visual design (per the frontend-design skill): bespoke palette, typography, layout, and one signature element — not a templated look.
- Meet a quality floor: responsive to mobile widths, keyboard-accessible board, visible focus states, reduced-motion support.

Assumptions recorded (minor details resolved without asking):
- The human is X and always moves first; the computer is O.
- One difficulty: the computer plays perfectly (unbeatable). No easy/hard toggle.
- Game state lives in memory only; no persistence or networking.

## Capabilities

### New Capabilities

- `game-play`: Core rules of tic tac toe — 3x3 board, alternating marks, legal-move validation, win-line detection, draw detection.
- `computer-opponent`: Automatic computer play — responds after the human move, chooses moves via minimax so it never loses, with perceptible pacing.
- `match-experience`: Observable UX around matches — status messaging, scorekeeping across rounds, round/match reset controls, responsiveness, accessibility, and motion behavior.

### Modified Capabilities

(none — greenfield change; no existing specs)

## Impact

- New code at repo root: Vite scaffold (`package.json`, `vite.config.js`, `index.html`) and React source under `src/`.
- New dependencies: react, react-dom (runtime); vite, @vitejs/plugin-react (dev).
- No APIs, data stores, or other systems affected. No existing code modified.
