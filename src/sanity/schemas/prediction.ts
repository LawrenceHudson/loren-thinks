import { defineField, defineType } from 'sanity'

export const ACCURACY_OPTIONS = [
  { title: 'Right', value: 'right' },
  { title: 'Wrong', value: 'wrong' },
  { title: 'TBD', value: 'tbd' },
]

export const prediction = defineType({
  name: 'prediction',
  title: 'Prediction',
  type: 'document',
  fields: [
    defineField({
      name: 'predictionText',
      title: 'Prediction',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'predictionDateLabel',
      title: 'Prediction date label',
      type: 'string',
      description: 'Human label shown on the timeline, e.g. "Predicted — Mar 2025".',
    }),
    defineField({
      name: 'predictedAt',
      title: 'Predicted at',
      type: 'datetime',
      description: 'Used for sorting the timeline.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'accuracy',
      title: 'Accuracy verdict',
      type: 'string',
      options: { list: ACCURACY_OPTIONS, layout: 'radio' },
      initialValue: 'tbd',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'realityText',
      title: 'What actually happened',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'realityDateLabel',
      title: 'Reality date label',
      type: 'string',
      description: 'e.g. "Resolved — Dec 2025" or "Still watching".',
    }),
    defineField({
      name: 'realityResolved',
      title: 'Reality resolved?',
      type: 'boolean',
      description: 'When false, the reality dot renders dashed (still watching).',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Newest prediction first',
      name: 'predictedDesc',
      by: [{ field: 'predictedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'predictionText', subtitle: 'accuracy' },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `Verdict: ${subtitle}` : 'Verdict: tbd',
    }),
  },
})
