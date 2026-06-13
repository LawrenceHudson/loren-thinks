import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from './env'

/**
 * Sanity read client.
 *
 * `projectId` falls back to the literal string 'placeholder' so that
 * `createClient` never throws at import time when no env vars are set. Queries
 * are never actually issued against the placeholder project because the data
 * layer (see ./data.ts) checks `isSanityConfigured` first and returns sample
 * content instead.
 */
export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})
