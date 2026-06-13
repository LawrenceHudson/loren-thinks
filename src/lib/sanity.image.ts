import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from './env'

const builder = createImageUrlBuilder({
  projectId: projectId || 'placeholder',
  dataset,
})

/**
 * Build a Sanity CDN image URL. Returns null for sample-content images, which
 * are already plain string URLs and are rendered directly.
 */
export function urlForImage(source: Image | undefined) {
  if (!source || !(source as { asset?: unknown }).asset) {
    return null
  }
  return builder.image(source).auto('format').fit('max')
}
