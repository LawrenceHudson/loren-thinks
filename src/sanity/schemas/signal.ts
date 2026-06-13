import { defineField, defineType } from 'sanity'

export const SIGNAL_STATUS_OPTIONS = [
  { title: 'Watching', value: 'watching' },
  { title: 'Confirmed', value: 'confirmed' },
  { title: 'Concern', value: 'concern' },
]

export const signal = defineType({
  name: 'signal',
  title: 'Signal',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Signal',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: SIGNAL_STATUS_OPTIONS, layout: 'radio' },
      initialValue: 'watching',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
    }),
    defineField({
      name: 'loggedAt',
      title: 'Logged at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'loggedDesc',
      by: [{ field: 'loggedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'text', subtitle: 'status' },
  },
})
