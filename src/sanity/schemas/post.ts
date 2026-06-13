import { defineField, defineType } from 'sanity'

export const SENTIMENT_OPTIONS = [
  { title: 'Concern (fear)', value: 'concern' },
  { title: 'Optimism (hope)', value: 'optimism' },
  { title: 'Watching (amber)', value: 'watching' },
]

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta' },
    { name: 'repost', title: 'Repost' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sentiment',
      title: 'Sentiment',
      type: 'string',
      group: 'meta',
      options: { list: SENTIMENT_OPTIONS, layout: 'radio' },
      initialValue: 'watching',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'topic' }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      description: 'Show in the homepage "Featured writing" stack.',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isRepost',
      title: 'Is this a repost?',
      type: 'boolean',
      group: 'repost',
      description: 'When true, the post links out to an external URL instead of an internal article.',
      initialValue: false,
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      group: 'repost',
      hidden: ({ parent }) => !parent?.isRepost,
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      group: 'repost',
      description: 'Publication or author of the reposted piece.',
      hidden: ({ parent }) => !parent?.isRepost,
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', sentiment: 'sentiment', media: 'cover', isRepost: 'isRepost' },
    prepare: ({ title, sentiment, media, isRepost }) => ({
      title,
      subtitle: `${isRepost ? 'Repost · ' : ''}${sentiment ?? ''}`,
      media,
    }),
  },
})
