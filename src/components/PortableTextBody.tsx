/* eslint-disable @next/next/no-img-element */
import {
  PortableText,
  type PortableTextComponents,
} from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

import { urlForImage } from '@/lib/sanity.image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const builder = urlForImage(value)
      if (!builder) return null
      return (
        <img
          src={builder.width(1200).url()}
          alt={value?.alt || ''}
          className="article-cover"
          loading="lazy"
        />
      )
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </a>
      )
    },
  },
}

export function PortableTextBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="article-body">
      <PortableText value={value} components={components} />
    </div>
  )
}
