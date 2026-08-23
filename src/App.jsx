import { useGame } from './useGame.js'
import { Board } from './components/Board.jsx'
import StatusBanner from './components/StatusBanner.jsx'
import ScoreTally from './components/ScoreTally.jsx'
import Controls from './components/Controls.jsx'

export default function App() {
  const { state, playHuman, newRound, resetScore } = useGame()

  return (
    <main className="sheet">
      <header className="masthead">
        <p className="eyebrow">Play the machine at its own game</p>
        <h1 className="title">
          Tic-tac-toe
          <svg className="title-underline" viewBox="0 0 220 14" aria-hidden="true" focusable="false">
            <path pathLength="1" d="M4 8 C 60 4, 150 11, 216 6" />
          </svg>
        </h1>
      </header>

      <StatusBanner turn={state.turn} outcome={state.outcome} />

      <Board board={state.board} line={state.line} outcome={state.outcome} onPlay={playHuman} />

      <ScoreTally score={state.score} />
      <Controls onNewRound={newRound} onResetScore={resetScore} />

      <p className="fine-print">You are X, in red. The machine is O, in blue. It does not lose.</p>
    </main>
  )
}
