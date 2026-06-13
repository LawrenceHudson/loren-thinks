/**
 * Embedded Sanity Studio at /studio.
 *
 * This route is intentionally OUTSIDE the (site) route group, so it renders
 * with no nav/footer chrome — just the full-screen Studio.
 */
import { NextStudio } from 'next-sanity/studio'

import config from '../../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
