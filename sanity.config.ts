'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/lib/env'
import { schemaTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

// Document types that should behave as singletons (one shared document, no
// "create new" or "delete" actions).
const SINGLETONS = new Set(['siteSettings'])

export default defineConfig({
  name: 'loren-thinks',
  title: 'Loren.thinks',
  basePath: '/studio',
  // `projectId` falls back to 'placeholder' so the Studio module can be imported
  // even before a real project is connected. The Studio simply won't load data
  // until a real ID is provided via NEXT_PUBLIC_SANITY_PROJECT_ID.
  projectId: projectId || 'placeholder',
  dataset,
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) =>
      SINGLETONS.has(context.schemaType)
        ? prev.filter(
            ({ action }) =>
              action && !['unpublish', 'delete', 'duplicate'].includes(action),
          )
        : prev,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
