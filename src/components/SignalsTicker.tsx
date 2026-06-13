import type { Signal } from '@/lib/types'

export function SignalsTicker({ signals }: { signals: Signal[] }) {
  if (!signals.length) return null

  // Duplicate the list so the marquee can loop seamlessly (-50% translate).
  const loop = [...signals, ...signals]

  return (
    <div className="ticker" aria-label="Live signals">
      <div className="ticker-inner">
        <div className="ticker-label">
          <span className="ticker-live" />
          Live signals
        </div>
        <div className="ticker-track">
          <div className="ticker-marquee">
            {loop.map((signal, i) => (
              <span className="ticker-item" key={`${signal._id}-${i}`}>
                <span className={`tdot tdot-${signal.status}`} />
                {signal.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
