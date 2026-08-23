import { Cell } from './Cell.jsx'

const CELL = 100

function center(index) {
  return {
    x: (index % 3) * CELL + CELL / 2,
    y: Math.floor(index / 3) * CELL + CELL / 2,
  }
}

function strikePath(line) {
  const a = center(line[0])
  const c = center(line[2])
  const dx = c.x - a.x
  const dy = c.y - a.y
  const len = Math.hypot(dx, dy)
  const pad = 14
  const ux = dx / len
  const uy = dy / len
  const start = { x: a.x - ux * pad, y: a.y - uy * pad }
  const end = { x: c.x + ux * pad, y: c.y + uy * pad }
  // perpendicular wobble so the stroke reads as hand-drawn
  const midX = (start.x + end.x) / 2 + -uy * 7
  const midY = (start.y + end.y) / 2 + ux * 7
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`
}

function GridLines() {
  return (
    <svg className="grid-lines" viewBox="0 0 300 300" aria-hidden="true" focusable="false">
      <path pathLength="1" className="rule rule-1" d="M101 8 C 99 70, 102 180, 100 292" />
      <path pathLength="1" className="rule rule-2" d="M199 6 C 201 90, 198 200, 201 294" />
      <path pathLength="1" className="rule rule-3" d="M6 101 C 90 99, 210 103, 294 100" />
      <path pathLength="1" className="rule rule-4" d="M5 199 C 80 202, 220 197, 295 200" />
    </svg>
  )
}

function StrikeOverlay({ line, winner }) {
  if (!line) return null
  return (
    <svg className={`strike ink-${winner}`} viewBox="0 0 300 300" aria-hidden="true" focusable="false">
      <path pathLength="1" className="strike-path" d={strikePath(line)} />
    </svg>
  )
}

export function Board({ board, line, outcome, onPlay }) {
  const humanTurn = outcome === null
  return (
    <div className="board-wrap">
      <GridLines />
      <div className="board" role="group" aria-label="Board, 3 by 3 grid">
        {board.map((mark, index) => (
          <Cell key={index} index={index} mark={mark} playable={humanTurn} onPlay={onPlay} />
        ))}
      </div>
      <StrikeOverlay line={line} winner={outcome} />
    </div>
  )
}
