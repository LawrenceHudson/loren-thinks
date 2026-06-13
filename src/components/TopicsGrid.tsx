import Link from 'next/link'

import type { Topic } from '@/lib/types'

import { Icon } from './Icon'

export function TopicsGrid({ topics }: { topics: Topic[] }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">What I cover</span>
          <h2 className="section-title">Four threads I keep pulling</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            The landscape is wide. These are the corners I write about most —
            where the shift is most visible and the stakes are highest.
          </p>
        </div>

        <div className="topics-grid">
          {topics.map((topic) => (
            <Link
              href={`/writing?topic=${topic.slug}`}
              className="topic-card"
              key={topic._id}
            >
              <div className="topic-icon">
                <Icon name={topic.icon} size={24} />
              </div>
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
              {typeof topic.essayCount === 'number' && (
                <span className="topic-count">
                  {topic.essayCount} {topic.essayCount === 1 ? 'essay' : 'essays'}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
