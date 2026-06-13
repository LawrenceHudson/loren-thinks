import Link from 'next/link'

import type { Post } from '@/lib/types'

import { Icon } from './Icon'
import { SentimentPill } from './SentimentPill'

function PostLink({
  post,
  children,
}: {
  post: Post
  children: React.ReactNode
}) {
  if (post.isRepost && post.externalUrl) {
    return (
      <a
        href={post.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="feature-card"
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={`/writing/${post.slug}`} className="feature-card">
      {children}
    </Link>
  )
}

export function FeaturedWriting({ posts }: { posts: Post[] }) {
  return (
    <aside className="feature-stack">
      <span className="eyebrow">Featured writing</span>
      {posts.map((post) => (
        <PostLink key={post._id} post={post}>
          <SentimentPill sentiment={post.sentiment} />
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <div className="card-meta">
            {post.topic?.name && <span>{post.topic.name}</span>}
            {post.isRepost ? (
              <span className="repost-arrow">
                Repost{post.source ? ` · ${post.source}` : ''}{' '}
                <Icon name="arrow-up-right" size={13} style={{ display: 'inline' }} />
              </span>
            ) : (
              <span>{formatDate(post.publishedAt)}</span>
            )}
          </div>
        </PostLink>
      ))}
    </aside>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
