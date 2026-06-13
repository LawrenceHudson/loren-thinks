import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CoverImage } from '@/components/CoverImage'
import { Icon } from '@/components/Icon'
import { PortableTextBody } from '@/components/PortableTextBody'
import { SentimentPill } from '@/components/SentimentPill'
import { getPostBySlug, getPostSlugs } from '@/lib/data'

interface Params {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Not found' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function ArticlePage({ params }: Params) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <article className="container article">
      <Link href="/writing" className="back-link">
        <Icon name="arrow-left" size={16} /> All writing
      </Link>

      <div className="article-meta">
        <SentimentPill sentiment={post.sentiment} />
        {post.topic?.name && <span>{post.topic.name}</span>}
        <span>{formatDate(post.publishedAt)}</span>
      </div>

      <h1 className="page-title" style={{ marginTop: 6 }}>
        {post.title}
      </h1>

      {post.cover && (
        <CoverImage cover={post.cover} alt={post.title} className="article-cover" />
      )}

      {post.isRepost ? (
        <div className="repost-callout">
          <p>{post.excerpt}</p>
          <a
            href={post.externalUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-amber"
          >
            Read the original
            {post.source ? ` at ${post.source}` : ''}
            <Icon name="arrow-up-right" size={17} />
          </a>
        </div>
      ) : post.body?.length ? (
        <div style={{ marginTop: 24 }}>
          <PortableTextBody value={post.body} />
        </div>
      ) : (
        <p className="lead" style={{ marginTop: 24 }}>
          {post.excerpt}
        </p>
      )}
    </article>
  )
}
