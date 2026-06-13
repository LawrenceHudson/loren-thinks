import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  // Singleton: managed via the desk structure (see ../structure.ts). Hide the
  // create/delete actions in the document menu.
  fields: [
    defineField({
      name: 'logoText',
      title: 'Logo text',
      type: 'string',
      description: 'The wordmark in the nav. The final dot is rendered in amber.',
      initialValue: 'Loren.thinks',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subscribeUrl',
      title: 'Subscribe URL',
      type: 'url',
      description: 'Destination for the dark "Subscribe" pill in the nav.',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      description: 'Small label above the hero headline (sits next to the animated dot).',
      initialValue: 'Field notes from the shift',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      type: 'text',
      rows: 3,
      description:
        'Wrap words in *asterisks* to render them in amber italic. Use line breaks for manual wrapping.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroBody',
      title: 'Hero body copy',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'aboutBlocks',
      title: 'About strip blocks',
      type: 'array',
      description: 'Short blocks shown in the "About / The perspective" strip.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'heading', subtitle: 'body' },
          },
        },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Full bio (rich text)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Long-form biography shown on the About page.',
    }),
    defineField({
      name: 'careerRoles',
      title: 'Career roles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Role title', type: 'string' }),
            defineField({ name: 'organization', title: 'Organization', type: 'string' }),
            defineField({ name: 'period', title: 'Period', type: 'string', description: 'e.g. "2021 — present"' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'organization' },
          },
        },
      ],
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
})
