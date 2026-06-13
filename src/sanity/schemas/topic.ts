import { defineField, defineType } from 'sanity'

export const ICON_OPTIONS = [
  { title: 'Building (org design)', value: 'building' },
  { title: 'Sparkles (working / reality)', value: 'sparkles' },
  { title: 'CPU (hardware / software)', value: 'cpu' },
  { title: 'Shield (security)', value: 'shield' },
  { title: 'Brain (research)', value: 'brain' },
  { title: 'Globe (society)', value: 'globe' },
]

export const topic = defineType({
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: { list: ICON_OPTIONS, layout: 'dropdown' },
      initialValue: 'sparkles',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'description' },
  },
})
