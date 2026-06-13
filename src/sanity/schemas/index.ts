import type { SchemaTypeDefinition } from 'sanity'

import { post } from './post'
import { prediction } from './prediction'
import { signal } from './signal'
import { siteSettings } from './siteSettings'
import { topic } from './topic'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  post,
  topic,
  prediction,
  signal,
]
