export default function Controls({ onNewRound, onResetScore }) {
  return (
    <div className="controls">
      <button type="button" className="control" onClick={onNewRound}>
        New round
      </button>
      <button type="button" className="control control-quiet" onClick={onResetScore}>
        Reset score
      </button>
    </div>
  )
}
