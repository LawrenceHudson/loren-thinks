import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export type Sentiment = 'concern' | 'optimism' | 'watching'
export type Accuracy = 'right' | 'wrong' | 'tbd'
export type SignalStatus = 'watching' | 'confirmed' | 'concern'

/**
 * A cover image can either be a real Sanity image asset (live CMS) or a plain
 * URL string (bundled sample content). The UI handles both.
 */
export type CoverImage = (Image & { alt?: string }) | { url: string; alt?: string }

export interface Topic {
  _id: string
  name: string
  slug: string
  icon: string
  description: string
  order: number
  essayCount?: number
}

export interface Post {
  _id: string
  title: string
  slug: string
  sentiment: Sentiment
  topic?: Pick<Topic, 'name' | 'slug' | 'icon'> | null
  excerpt: string
  cover?: CoverImage | null
  body?: PortableTextBlock[]
  featured: boolean
  publishedAt: string
  isRepost: boolean
  externalUrl?: string | null
  source?: string | null
}

export interface Prediction {
  _id: string
  predictionText: string
  predictionDateLabel: string
  predictedAt: string
  accuracy: Accuracy
  realityText?: string | null
  realityDateLabel?: string | null
  realityResolved: boolean
}

export interface Signal {
  _id: string
  text: string
  status: SignalStatus
  sourceUrl?: string | null
  loggedAt: string
}

export interface CareerRole {
  _key?: string
  title: string
  organization: string
  period: string
  description?: string
}

export interface SiteSettings {
  logoText: string
  subscribeUrl: string
  heroEyebrow: string
  /** Supports *asterisk* wrapping for amber italic emphasis and \n line breaks. */
  heroHeadline: string
  heroBody: string
  aboutBlocks: { _key?: string; heading: string; body: string }[]
  bio: PortableTextBlock[]
  careerRoles: CareerRole[]
  footerTagline: string
}
