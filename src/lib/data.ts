import { isSanityConfigured } from './env'
import {
  allPostsQuery,
  featuredPostsQuery,
  postBySlugQuery,
  postSlugsQuery,
  predictionsQuery,
  signalsQuery,
  siteSettingsQuery,
  topicsQuery,
} from './queries'
import {
  samplePosts,
  samplePredictions,
  sampleSignals,
  sampleSiteSettings,
  sampleTopics,
} from './sampleData'
import { client } from './sanity.client'
import type {
  Post,
  Prediction,
  Signal,
  SiteSettings,
  Topic,
} from './types'

/**
 * Single data-access layer for the whole app.
 *
 * Every function follows the same contract: if Sanity is not configured, return
 * bundled sample content; otherwise run the GROQ query and fall back to sample
 * content only if the query returns nothing. This is what lets `npm run dev`
 * render the complete design with zero environment variables.
 */

// Revalidate live CMS content every 60 seconds (ignored when serving samples).
const REVALIDATE = 60

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return sampleSiteSettings
  const data = await client.fetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    { next: { revalidate: REVALIDATE } },
  )
  return data ?? sampleSiteSettings
}

export async function getAllPosts(): Promise<Post[]> {
  if (!isSanityConfigured) return samplePosts
  const data = await client.fetch<Post[]>(
    allPostsQuery,
    {},
    { next: { revalidate: REVALIDATE } },
  )
  return data?.length ? data : samplePosts
}

export async function getFeaturedPosts(): Promise<Post[]> {
  if (!isSanityConfigured) {
    return samplePosts.filter((p) => p.featured).slice(0, 3)
  }
  const data = await client.fetch<Post[]>(
    featuredPostsQuery,
    {},
    { next: { revalidate: REVALIDATE } },
  )
  return data?.length ? data : samplePosts.filter((p) => p.featured).slice(0, 3)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) {
    return samplePosts.find((p) => p.slug === slug) ?? null
  }
  const data = await client.fetch<Post | null>(
    postBySlugQuery,
    { slug },
    { next: { revalidate: REVALIDATE } },
  )
  return data ?? samplePosts.find((p) => p.slug === slug) ?? null
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return samplePosts.filter((p) => !p.isRepost).map((p) => p.slug)
  }
  const data = await client.fetch<string[]>(postSlugsQuery)
  return data?.length
    ? data
    : samplePosts.filter((p) => !p.isRepost).map((p) => p.slug)
}

export async function getTopics(): Promise<Topic[]> {
  if (!isSanityConfigured) return sampleTopics
  const data = await client.fetch<Topic[]>(
    topicsQuery,
    {},
    { next: { revalidate: REVALIDATE } },
  )
  return data?.length ? data : sampleTopics
}

export async function getPredictions(): Promise<Prediction[]> {
  if (!isSanityConfigured) return samplePredictions
  const data = await client.fetch<Prediction[]>(
    predictionsQuery,
    {},
    { next: { revalidate: REVALIDATE } },
  )
  return data?.length ? data : samplePredictions
}

export async function getSignals(): Promise<Signal[]> {
  if (!isSanityConfigured) return sampleSignals
  const data = await client.fetch<Signal[]>(
    signalsQuery,
    {},
    { next: { revalidate: REVALIDATE } },
  )
  return data?.length ? data : sampleSignals
}
