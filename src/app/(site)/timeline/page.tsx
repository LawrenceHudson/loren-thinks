import type { Metadata } from 'next'

import { Verdict } from '@/components/Verdict'
import { getPredictions } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Timeline',
  description:
    'Two timelines side by side: predictions vs. what actually happened — graded right, wrong, or TBD.',
}

export default async function TimelinePage() {
  const predictions = await getPredictions()

  const scored = predictions.filter((p) => p.accuracy !== 'tbd')
  const right = predictions.filter((p) => p.accuracy === 'right').length
  const hitRate = scored.length
    ? Math.round((right / scored.length) * 100)
    : 0

  return (
    <>
      <div className="page-head">
        <div className="container">
          <span className="eyebrow">Predictions vs. reality</span>
          <h1 className="page-title">The scoreboard</h1>
          <p className="page-sub">
            It is easy to sound smart predicting the future and never get graded.
            So I grade myself here — out loud. {right} of {scored.length} resolved
            predictions came in right ({hitRate}% hit rate), and the open ones are
            still marked TBD.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="timeline-full">
            <div className="tl-col left">
              <div className="tl-col-head pred">
                <span className="tl-dot" style={{ position: 'static' }} /> What I predicted
              </div>
              {predictions.map((p) => (
                <div className="tl-item-light" key={`pred-${p._id}`}>
                  <span className="tl-dot" />
                  <div className="tl-date">{p.predictionDateLabel}</div>
                  <div className="tl-text">{p.predictionText}</div>
                </div>
              ))}
            </div>

            <div className="tl-col">
              <div className="tl-col-head real">
                <span className="tl-dot real" style={{ position: 'static' }} /> What actually happened
              </div>
              {predictions.map((p) => (
                <div className="tl-item-light real-side" key={`real-${p._id}`}>
                  <span
                    className={`tl-dot ${p.realityResolved ? 'real' : 'watching'}`}
                  />
                  <div className="tl-date">
                    {p.realityDateLabel || 'Still watching'}
                  </div>
                  <div className="tl-text">
                    {p.realityText ||
                      'No verdict yet — this one is still open.'}
                  </div>
                  <Verdict accuracy={p.accuracy} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
