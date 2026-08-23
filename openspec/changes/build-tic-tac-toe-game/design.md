## Context

Greenfield repo: no application code exists yet. The change scaffolds a React + Vite SPA and must deliver both correct gameplay (see specs) and a distinctive visual identity produced under the frontend-design approach. Constraints from the proposal: human vs computer only, human is X and moves first, computer plays perfectly, no persistence, no backend.

## Goals / Non-Goals

**Goals:**
- A visual direction that could not be mistaken for a template, derived from the subject itself.
- Pure, unit-testable game logic and AI separated from React presentation code.
- Interface quality floor met by construction: mobile widths, keyboard play, focus visibility, reduced motion.

**Non-Goals:**
- No difficulty levels, themes, online multiplayer, persistence, or analytics.
- No component library or CSS framework; styling is bespoke.
- No server rendering, routing, or state libraries.

## Decisions

### D1: Visual direction — "two pens dueling on graph paper"

Tic tac toe's native habitat is the doodled notebook page, so the design borrows its materials instead of dressing it up: the whole viewport is a sheet of engineering graph paper; the human writes X in red ballpoint, the computer answers O in blue ballpoint; finished games get struck through like a completed round on paper.

Design tokens:

| Token | Value | Role |
|---|---|---|
| `paper` | `#FBFBF7` | Sheet background (cooler/brighter than the clichéd warm cream) |
| `graph-blue` | `#BFD8E4` | Ruling lines and grid |
| `pen-red` | `#CE3A32` | Human X ink |
| `pen-blue` | `#2B54C4` | Computer O ink |
| `graphite` | `#33322F` | Text, pencil-gray details |
| `highlight-yellow` | `#F5D547` | Status highlighter swipe behind key messages |

Typography: **Caveat** (handwritten) for the display title and celebratory outcomes, used sparingly; **IBM Plex Mono** for all functional labels, buttons, status line, and score — the machine's voice against the human's handwriting. System fallbacks declared for both.

Layout: single centered column on the paper sheet; the board is the hero and sits directly under the status line; scoreboard and controls sit quietly below.

```
        PLAY THE MACHINE AT ITS OWN GAME      <- mono caps eyebrow
              Tic-tac-toe                     <- Caveat, very large

   ┌───────────────────────────────────┐
   │  Your move — you're X             │  <- mono, highlighter swipe
   │                                   │     on state changes
   │        ┌────┬────┬────┐           │
   │        │    │    │    │           │  <- 3x3 grid drawn as
   │        ├────┼────┼────┤           │     sketchy ruled strokes;
   │        │    │    │    │           │     marks write themselves in
   │        ├────┼────┼────┤           │
   │        │    │    │    │           │
   │        └────┴────┴────┘           │
   │                                   │
   │   WINS ||||  LOSSES ||   DRAWS |  │  <- tally marks, graphite
   │   [New round]   [Reset score]     │  <- quiet mono text buttons
   └───────────────────────────────────┘
```

Signature element (the one memorable thing): the **winning-line strike-through** — an SVG pen stroke with slight hand wobble that slashes across the three winning cells after a short beat, like striking out a finished game. Marks also write themselves in via stroke-dashoffset draw-on. Everything else stays quiet so the strike lands.

Self-critique against generic defaults: this avoids all three common AI-design clusters (warm-cream editorial serif; dark background + single acid accent; broadsheet hairlines). Score-as-pencil-tallies and the two-pen narrative are choices specific to this subject; a generic pass would have produced a centered card, gradient accent, and numeric counters.

### D2: Scaffold — Vite + React, JavaScript, no extra runtime deps

Plain JSX keeps the surface minimal for a nine-cell app. Alternative considered: TypeScript (better safety for the minimax recursion) rejected here because the logic modules are small and heavily unit-tested; if the project later grows, migrating `src/game/*.js` to `.ts` is mechanical. Styling is hand-written CSS with custom properties for the tokens above (alternative: Tailwind — rejected, adds dependency and works against bespoke SVG/CSS effects). Fonts load from Google Fonts with `font-display: swap`.

### D3: Architecture — pure logic modules + thin React shell

```
index.html                fonts, mount point
vite.config.js            @vitejs/plugin-react only
package.json
src/
  main.jsx                mount
  index.css               tokens, layout, components styles
  App.jsx                 owns game state, wires everything
  useGame.js              reducer: board, turn, outcome, score, pacing timer
  game/logic.js           LINES table, winner(board), applyMove, isFull
  game/minimax.js         bestMove(board): perfect play, depth-weighted
  components/
    Board.jsx             grid of Cell buttons + StrikeOverlay svg
    Cell.jsx              accessible button, renders X/O svg strokes
    StatusBanner.jsx      aria-live status + highlighter
    ScoreTally.jsx        tally-mark rendering
    Controls.jsx          New round / Reset score
```

Rationale: winner detection and minimax are pure functions over a 9-element array — testable without DOM, reusable if a UI rewrite ever happens. Alternatives considered: `useReducer` inside one file with logic inline (rejected: harder to test), external store (zustand — rejected: needless dependency).

State shape: `{ board: Array<9> ('x'|'o'|null), turn: 'human'|'computer', outcome: null|'human'|'computer'|'draw', line: winning triple|null, score: {w,l,d}, pendingTimeout }`. The computer's move runs on a ~600 ms `setTimeout`; the effect owning the timer clears it on unmount and on reset, and the reducer ignores stale moves via a move-count guard — this prevents ghost moves after "New round" mid-think (spec: ended/new rounds lock the board).

Minimax detail: terminal scoring `10 − depth` for computer win, `depth − 10` for loss so it prefers fast wins and slow losses; empty-cell iteration order fixed for determinism; no memoization needed at 9 cells. First move may shortcut to a random corner/center among equally-optimal choices for variety without affecting optimality (spec requires "never loses," which holds).

### D4: Marks and strike rendered as animated SVG strokes

X and O are inline SVG paths (two slightly imperfect strokes; an open circle) stroked in `pen-red`/`pen-blue`, revealed with `stroke-dasharray`/`stroke-dashoffset` transitions (~180–250 ms, staggered for X's two strokes). The winning strike is a single path computed from the winning triple's start/middle/end cell centers in a shared `viewBox` overlaying the grid — percentages scale with responsive sizing, so no pixel math. Under `prefers-reduced-motion: reduce`, draw-on and strike render instantly (spec requirement).

### D5: Accessibility model

Cells are real `<button>` elements inside `role="grid"` semantics kept simple (a labeled group of buttons ordered row-major), each with `aria-label` reflecting state ("row 2, column 3 — empty", "— X"). Focus indicator: dashed `graphite` outline offset, always visible. `StatusBanner` is `aria-live="polite"` so turn changes and outcomes are announced. Tally counts include visually hidden numerals alongside decorative tally strokes. Keyboard-only play therefore satisfies the spec scenario without special shortcuts.

## Risks / Trade-offs

- [Handwritten display face hurts legibility at small sizes] → Caveat is confined to title/outcome moments; all functional text is Plex Mono.
- [Webfont unavailable offline] → system cursive/monospace fallback stacks declared; layout does not depend on exact metrics.
- [Unbeatable AI feels discouraging] → accepted per proposal assumption; draws are attainable, and status copy names the outcome plainly rather than taunting.
- [Ghost computer move after reset mid-"think"] → timer cleared in effect cleanup plus stale-move guard in the reducer; covered by a unit test.
- [Red/blue confusion for color-blind users] → mark shapes differ; color is never the sole signal; labels announce whose mark is where.
- [Strike misalignment across viewports] → strike coordinates derive from cell centers in percentage space of one viewBox, tested at 360 px width.

## Migration Plan

None needed — greenfield. Rollback equals deleting the scaffold directory contents; nothing else references it.

## Open Questions

None blocking. Exact delay length (~600 ms) and copy wording can be tuned during apply without touching specs or task structure.
