function TallyGroup({ five }) {
  return (
    <svg className="tally-five" viewBox="0 0 30 24" aria-hidden="true" focusable="false">
      <line x1="4" y1="3" x2="5" y2="21" />
      <line x1="10" y1="2.6" x2="10.6" y2="21.2" />
      <line x1="16" y1="2.8" x2="15.6" y2="20.9" />
      <line x1="22" y1="2.7" x2="21" y2="21.1" />
      <line x1="1" y1="19" x2="27" y2="4" />
    </svg>
  )
}

function TallyStroke({ tilt }) {
  return (
    <svg className="tally-one" viewBox="0 0 8 24" aria-hidden="true" focusable="false" style={{ transform: `rotate(${tilt}deg)` }}>
      <line x1="4" y1="2.8" x2="4.4" y2="21.2" />
    </svg>
  )
}

function Tally({ value }) {
  const fives = Math.floor(value / 5)
  const rest = value % 5
  const tilts = [-2, 1.5, -1, 2, -1.5]
  return (
    <>
      {Array.from({ length: fives }, (_, i) => (
        <TallyGroup key={`g${i}`} />
      ))}
      {Array.from({ length: rest }, (_, i) => (
        <TallyStroke key={`s${i}`} tilt={tilts[i % tilts.length]} />
      ))}
    </>
  )
}

export default function ScoreTally({ score }) {
  const rows = [
    ['WINS', score.w],
    ['LOSSES', score.l],
    ['DRAWS', score.d],
  ]
  return (
    <dl className="tally">
      {rows.map(([label, value]) => (
        <div className="tally-row" key={label}>
          <dt className="tally-label">
            {label} <span className="sr-only">: {value}</span>
          </dt>
          <dd className="tally-marks">
            {value === 0 && <span className="tally-zero" aria-hidden="true">—</span>}
            <Tally value={value} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
