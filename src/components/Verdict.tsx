import type { Accuracy } from '@/lib/types'

const LABELS: Record<Accuracy, string> = {
  right: 'Right',
  wrong: 'Wrong',
  tbd: 'TBD',
}

export function Verdict({ accuracy }: { accuracy: Accuracy }) {
  return <span className={`verdict verdict-${accuracy}`}>{LABELS[accuracy]}</span>
}
