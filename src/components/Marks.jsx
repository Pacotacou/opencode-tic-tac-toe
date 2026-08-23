export function XMark() {
  return (
    <svg className="mark ink-red" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path
        pathLength="1"
        className="stroke stroke-1"
        d="M22 24 C 38 36, 56 60, 79 81"
      />
      <path
        pathLength="1"
        className="stroke stroke-2"
        d="M77 21 C 62 40, 39 58, 23 80"
      />
    </svg>
  )
}

export function OMark() {
  return (
    <svg className="mark ink-blue" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path
        pathLength="1"
        className="stroke stroke-single"
        d="M62 18 C 78 26, 86 42, 83 57 C 79 76, 63 87, 46 85 C 28 83, 15 68, 16 50 C 17 33, 30 20, 47 17 C 53 16, 59 16, 64 19"
      />
    </svg>
  )
}
