import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { getSiteSettings } from '@/lib/data'

/**
 * Chrome for all public pages: sticky nav + footer. The Sanity Studio lives
 * OUTSIDE this route group (at /studio) so it renders with no site chrome.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <>
      <Nav logoText={settings.logoText} subscribeUrl={settings.subscribeUrl} />
      <main>{children}</main>
      <Footer
        logoText={settings.logoText}
        tagline={settings.footerTagline}
        subscribeUrl={settings.subscribeUrl}
      />
    </>
  )
}
