const MESSAGES = {
  human: 'You win',
  computer: 'Computer wins',
  draw: 'Draw',
}

export default function StatusBanner({ turn, outcome }) {
  const text = outcome ? MESSAGES[outcome] : turn === 'human' ? 'Your move' : 'Computer is thinking…'
  return (
    <p className={`status status-${outcome ?? turn}`} role="status" aria-live="polite">
      <span className="status-text" key={`${outcome ?? ''}-${turn}`}>
        {text}
      </span>
    </p>
  )
}
