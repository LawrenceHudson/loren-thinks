import type { Metadata } from 'next'
import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { SentimentPill } from '@/components/SentimentPill'
import { getAllPosts, getTopics } from '@/lib/data'
import type { Post } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays and reposts on the AI / technology landscape.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function PostRow({ post }: { post: Post }) {
  const inner = (
    <>
      <div>
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
            <span>Essay</span>
          )}
        </div>
      </div>
      <div className="post-date">{formatDate(post.publishedAt)}</div>
    </>
  )

  if (post.isRepost && post.externalUrl) {
    return (
      <a
        className="post-row"
        href={post.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    )
  }
  return (
    <Link className="post-row" href={`/writing/${post.slug}`}>
      {inner}
    </Link>
  )
}

export default async function WritingPage({
  searchParams,
}: {
  searchParams: { topic?: string }
}) {
  const [posts, topics] = await Promise.all([getAllPosts(), getTopics()])
  const activeTopic = searchParams.topic
  const filtered = activeTopic
    ? posts.filter((p) => p.topic?.slug === activeTopic)
    : posts
  const activeTopicName = topics.find((t) => t.slug === activeTopic)?.name

  return (
    <>
      <div className="page-head">
        <div className="container">
          <span className="eyebrow">Writing</span>
          <h1 className="page-title">Essays &amp; reposts</h1>
          <p className="page-sub">
            {activeTopicName
              ? `Filed under “${activeTopicName}.”`
              : 'Long-form notes on where AI is changing the landscape — plus interesting outside pieces worth your time.'}
          </p>

          <div className="hero-actions" style={{ margin: '24px 0 0' }}>
            <Link
              href="/writing"
              className={`btn ${activeTopic ? 'btn-ghost' : 'btn-dark'}`}
            >
              All
            </Link>
            {topics.map((t) => (
              <Link
                key={t._id}
                href={`/writing?topic=${t.slug}`}
                className={`btn ${activeTopic === t.slug ? 'btn-dark' : 'btn-ghost'}`}
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {filtered.length ? (
            <div className="post-list">
              {filtered.map((post) => (
                <PostRow key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="lead">No posts here yet — check back soon.</p>
          )}
        </div>
      </section>
    </>
  )
}
