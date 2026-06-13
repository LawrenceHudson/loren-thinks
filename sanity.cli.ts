import { defineCliConfig } from 'sanity/cli'

import { dataset, projectId } from './src/lib/env'

/**
 * Sanity CLI configuration (used by `npx sanity ...`).
 *
 * NOTE: The Sanity CLI does NOT read .env.local. When these env vars are not
 * present in your shell, projectId is empty and CLI commands that need a
 * project (e.g. `sanity dataset import`) will fail with a clear error. Export
 * NEXT_PUBLIC_SANITY_PROJECT_ID in your shell first — see the README.
 */
export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
