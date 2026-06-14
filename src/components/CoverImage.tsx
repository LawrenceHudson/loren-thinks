/* eslint-disable @next/next/no-img-element */
import { urlForImage } from '@/lib/sanity.image'
import type { CoverImage as CoverImageType } from '@/lib/types'

interface Props {
  cover: CoverImageType | null | undefined
  alt: string
  className?: string
  width?: number
}

type UrlCover = { url: string; alt?: string }

/** Narrows the cover union to the plain-URL (sample content) branch. */
function isUrlCover(cover: CoverImageType): cover is UrlCover {
  return typeof (cover as { url?: unknown }).url === 'string'
}

/**
 * Renders a cover image from either a Sanity image asset (live CMS) or a plain
 * URL string (bundled sample content). Uses a plain <img> so both cases work
 * identically without special-casing next/image domains for sample data.
 */
export function CoverImage({ cover, alt, className, width = 1200 }: Props) {
  if (!cover) return null

  let src: string | null = null
  if (isUrlCover(cover)) {
    src = cover.url
  } else {
    const builder = urlForImage(cover)
    src = builder ? builder.width(width).url() : null
  }

  if (!src) return null
  const altText = (cover as { alt?: string }).alt || alt
  return <img src={src} alt={altText} className={className} loading="lazy" />
}