## 1. Scaffold

- [x] 1.1 Scaffold Vite + React app at repo root (`package.json`, `vite.config.js` with @vitejs/plugin-react, `index.html` with Google Fonts links for Caveat and IBM Plex Mono including fallback stacks, `src/main.jsx`)
- [x] 1.2 Add Vitest as dev dependency with a `test` script; confirm `npm run dev` serves the empty app

## 2. Game logic (pure modules)

- [x] 2.1 Create `src/game/logic.js`: LINES table (8 win triples), `winner(board)` returning `{player, line} | null`, `applyMove(board, index, player)` rejecting occupied cells, `isFull(board)`
- [x] 2.2 Unit tests: row/column/diagonal wins each detected, no false positive on mixed boards, draw when full without alignment, move into occupied cell rejected
- [x] 2.3 Create `src/game/minimax.js`: `bestMove(board)` via minimax with depth-weighted scores (+fast wins, −slow losses), deterministic iteration order
- [x] 2.4 Unit tests for AI: takes an available win, blocks an immediate human threat, `bestMove` from the empty board never leads to a computer loss (minimax-vs-minimax round ends in draw), stale/terminal board returns no move

## 3. Game state shell

- [x] 3.1 Create `src/useGame.js` reducer with `{board, turn, outcome, line, score}`; actions for human move, computer move, new round (board cleared, score kept), reset score (tally zeroed, board untouched)
- [x] 3.2 Wire computer turn effect: ~600 ms timeout dispatching `bestMove` result; timer cleared on unmount/reset and reducer ignores stale moves (no ghost mark after "New round" mid-think); unit-test the stale-move guard
- [x] 3.3 Human input rules in reducer/UI: moves accepted only on human turn into empty cells; ended rounds lock the board

## 4. Interface structure

- [x] 4.1 Build `Board.jsx` + `Cell.jsx`: nine buttons in a labeled grid, aria-labels reflecting position and content ("row 2, column 3 — empty"), disabled semantics while it is not the human's turn or round is over
- [x] 4.2 Build `StatusBanner.jsx` as aria-live="polite": turn messages ("Your move", "Computer is thinking…") and outcomes ("You win", "Computer wins", "Draw")
- [x] 4.3 Build `ScoreTally.jsx` (wins/losses/draws with visually hidden counts) and `Controls.jsx` ("New round", "Reset score") wired to reducer actions
- [x] 4.4 Assemble `App.jsx` layout per design wireframe: eyebrow, Caveat title, banner, board, tally, controls

## 5. Visual design implementation

- [x] 5.1 Implement token stylesheet `src/index.css`: paper/graph-blue sheet background with graph ruling, pen-red/pen-blue inks, graphite text, highlight-yellow swipe; custom properties per design table
- [x] 5.2 Render X/O as inline SVG strokes (two imperfect strokes / open circle) revealed with stroke-dashoffset draw-on animation, staggered for X's two strokes
- [x] 5.3 Implement signature strike-through: SVG overlay path through winning-triple cell centers in percentage viewBox coordinates, drawn after a short beat following the final mark
- [x] 5.4 Tally-mark styling in graphite plus quiet mono controls; page-load sketch-in moment (title underline + grid), kept under ~400 ms

## 6. Quality floor

- [x] 6.1 Responsive pass: single-column layout usable at 360 px through desktop; board sized within viewport, no horizontal overflow; verify strike alignment at 360 px
- [x] 6.2 Reduced motion: `prefers-reduced-motion` disables draw-on/strike/sketch-in animations, rendering end states instantly
- [x] 6.3 Keyboard pass: play a full round keyboard-only; visible dashed-graphite focus ring on cells and controls; screen-reader status announcements verified

## 7. Verification

- [x] 7.1 Full test suite green (`npm run test`); lint/build clean (`npm run build`)
- [x] 7.2 Manual acceptance sweep against all spec scenarios (game-play, computer-opponent, match-experience) including AI never losing across a multi-round session and score behavior across rounds/reset/reload
