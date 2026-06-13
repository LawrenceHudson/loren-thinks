import type { Metadata } from 'next'

import { Icon } from '@/components/Icon'
import { getSignals } from '@/lib/data'
import type { SignalStatus } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Signals',
  description:
    'A running log of signals from the AI / technology landscape — watching, confirmed, or concern.',
}

const STATUS_LABEL: Record<SignalStatus, string> = {
  watching: 'Watching',
  confirmed: 'Confirmed',
  concern: 'Concern',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function SignalsPage() {
  const signals = await getSignals()

  return (
    <>
      <div className="page-head">
        <div className="container">
          <span className="eyebrow">Live signals</span>
          <h1 className="page-title">The signal log</h1>
          <p className="page-sub">
            Small things I am tracking that might turn into big things — the raw
            feed behind the writing. Tagged watching, confirmed, or concern.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="signal-list">
            {signals.map((signal) => {
              const inner = (
                <>
                  <span className={`signal-status ${signal.status}`}>
                    <span className={`tdot tdot-${signal.status}`} />
                    {STATUS_LABEL[signal.status]}
                  </span>
                  <span className="signal-text">
                    {signal.text}
                    {signal.sourceUrl && (
                      <Icon
                        name="arrow-up-right"
                        size={14}
                        style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }}
                      />
                    )}
                  </span>
                  <span className="signal-date">{formatDate(signal.loggedAt)}</span>
                </>
              )
              return signal.sourceUrl ? (
                <a
                  key={signal._id}
                  className="signal-row"
                  href={signal.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div key={signal._id} className="signal-row">
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
