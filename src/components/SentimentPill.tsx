import type { Sentiment } from '@/lib/types'

const LABELS: Record<Sentiment, string> = {
  concern: 'Concern',
  optimism: 'Optimism',
  watching: 'Watching',
}

export function SentimentPill({ sentiment }: { sentiment: Sentiment }) {
  return <span className={`pill pill-${sentiment}`}>{LABELS[sentiment]}</span>
}
