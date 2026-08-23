import { XMark, OMark } from './Marks.jsx'

export function Cell({ index, mark, playable, onPlay }) {
  const row = Math.floor(index / 3) + 1
  const col = (index % 3) + 1
  const label = `row ${row}, column ${col}${mark ? ` — ${mark.toUpperCase()}` : ' — empty'}`

  return (
    <button
      type="button"
      className={`cell${playable && !mark ? ' cell-open' : ''}`}
      aria-label={label}
      disabled={!playable || Boolean(mark)}
      onClick={() => onPlay(index)}
    >
      {mark === 'x' && <XMark />}
      {mark === 'o' && <OMark />}
      {!mark && (
        <svg className="ghost" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <path d="M22 24 C 38 36, 56 60, 79 81 M77 21 C 62 40, 39 58, 23 80" />
        </svg>
      )}
    </button>
  )
}
