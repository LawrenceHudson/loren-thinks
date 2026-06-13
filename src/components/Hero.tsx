import Link from 'next/link'

import type { Post, SiteSettings } from '@/lib/types'

import { CountUp } from './CountUp'
import { FeaturedWriting } from './FeaturedWriting'
import { Headline } from './Headline'
import { Icon } from './Icon'

interface HeroProps {
  settings: SiteSettings
  featured: Post[]
  stats: { essays: number; predictions: number; signals: number }
}

export function Hero({ settings, featured, stats }: HeroProps) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">
            <span className="hero-dot" />
            {settings.heroEyebrow}
          </span>

          <h1 className="hero-headline">
            <Headline text={settings.heroHeadline} />
          </h1>

          <p className="hero-body">{settings.heroBody}</p>

          <div className="hero-actions">
            <Link href="/writing" className="btn btn-amber">
              Read the writing
              <Icon name="arrow-right" size={18} />
            </Link>
            <Link href="/timeline" className="btn btn-ghost">
              See the scoreboard
            </Link>
          </div>

          <div className="stats">
            <div>
              <CountUp end={stats.essays} suffix="+" />
              <div className="stat-label">Essays &amp; reposts</div>
            </div>
            <div>
              <CountUp end={stats.predictions} />
              <div className="stat-label">Predictions graded</div>
            </div>
            <div>
              <CountUp end={stats.signals} />
              <div className="stat-label">Signals tracked</div>
            </div>
          </div>
        </div>

        <FeaturedWriting posts={featured} />
      </div>
    </section>
  )
}
