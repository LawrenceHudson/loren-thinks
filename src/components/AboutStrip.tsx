import Link from 'next/link'

import type { SiteSettings } from '@/lib/types'

import { Icon } from './Icon'

export function AboutStrip({ settings }: { settings: SiteSettings }) {
  return (
    <section className="about section">
      <div className="container about-grid">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <span className="eyebrow">About</span>
          <h2 className="section-title">The perspective</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            A CTO writing honestly from the deployment side of the AI shift.
          </p>
          <Link
            href="/about"
            className="btn btn-ghost"
            style={{ marginTop: 22 }}
          >
            More about me
            <Icon name="arrow-right" size={17} />
          </Link>
        </div>

        <div className="about-blocks">
          {settings.aboutBlocks.map((block) => (
            <div className="about-block" key={block._key ?? block.heading}>
              <h3>{block.heading}</h3>
              <p>{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
