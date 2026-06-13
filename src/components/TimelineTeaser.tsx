import Link from 'next/link'

import type { Prediction } from '@/lib/types'

import { Icon } from './Icon'
import { Verdict } from './Verdict'

export function TimelineTeaser({ predictions }: { predictions: Prediction[] }) {
  const items = predictions.slice(0, 3)

  return (
    <section className="timeline-teaser section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Predictions vs. reality</span>
          <h2 className="section-title">I grade myself in public</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Two timelines, side by side: what I predicted, and what actually
            happened. Right, wrong, or still too early to call.
          </p>
        </div>

        <div className="dual">
          <div className="dual-col predictions">
            <div className="dual-head pred">
              <span className="tl-dot" style={{ position: 'static' }} /> What I predicted
            </div>
            {items.map((p) => (
              <div className="tl-item" key={`pred-${p._id}`}>
                <span className="tl-dot" />
                <div className="tl-date">{p.predictionDateLabel}</div>
                <div className="tl-text">{p.predictionText}</div>
              </div>
            ))}
          </div>

          <div className="dual-col reality">
            <div className="dual-head real">
              <span className="tl-dot real" style={{ position: 'static' }} /> What actually happened
            </div>
            {items.map((p) => (
              <div className="tl-item" key={`real-${p._id}`}>
                <span className={`tl-dot ${p.realityResolved ? 'real' : 'watching'}`} />
                <div className="tl-date">{p.realityDateLabel || 'Still watching'}</div>
                <div className="tl-text">
                  {p.realityText || 'No verdict yet — this one is still open.'}
                </div>
                <Verdict accuracy={p.accuracy} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <Link href="/timeline" className="btn btn-amber">
            See the full scoreboard
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
