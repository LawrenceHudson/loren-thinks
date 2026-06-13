/**
 * Centralized Sanity environment configuration.
 *
 * The whole app is designed to run BEFORE a CMS is connected. To make that
 * possible, nothing here throws when variables are missing. Instead we expose
 * `isSanityConfigured`, and every data-access function falls back to bundled
 * sample content when it is `false`.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

/**
 * True only when a real Sanity project ID is present. All live GROQ queries are
 * gated behind this flag; when it is false the app serves sample data instead.
 */
export const isSanityConfigured = projectId.length > 0
