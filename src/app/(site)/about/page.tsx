import type { Metadata } from 'next'

import { PortableTextBody } from '@/components/PortableTextBody'
import { getSiteSettings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About',
  description: 'Bio and career of the person behind Loren.thinks.',
}

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <div className="page-head">
        <div className="container">
          <span className="eyebrow">About</span>
          <h1 className="page-title">Who is writing this</h1>
          <p className="page-sub">{settings.footerTagline}</p>
        </div>
      </div>

      <section className="section">
        <div className="container about-page-grid">
          <div className="bio-body">
            {settings.bio?.length ? (
              <PortableTextBody value={settings.bio} />
            ) : (
              <p>{settings.heroBody}</p>
            )}
          </div>

          <aside className="career">
            <h3>Career</h3>
            {settings.careerRoles.map((role) => (
              <div className="role" key={role._key ?? role.title}>
                <h4>{role.title}</h4>
                <div className="org">{role.organization}</div>
                <div className="period">{role.period}</div>
                {role.description && (
                  <p className="role-desc">{role.description}</p>
                )}
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  )
}
