import { AboutStrip } from '@/components/AboutStrip'
import { Hero } from '@/components/Hero'
import { SignalsTicker } from '@/components/SignalsTicker'
import { TimelineTeaser } from '@/components/TimelineTeaser'
import { TopicsGrid } from '@/components/TopicsGrid'
import {
  getAllPosts,
  getFeaturedPosts,
  getPredictions,
  getSignals,
  getSiteSettings,
  getTopics,
} from '@/lib/data'

export default async function HomePage() {
  const [settings, featured, posts, topics, predictions, signals] =
    await Promise.all([
      getSiteSettings(),
      getFeaturedPosts(),
      getAllPosts(),
      getTopics(),
      getPredictions(),
      getSignals(),
    ])

  const stats = {
    essays: posts.length,
    predictions: predictions.length,
    signals: signals.length,
  }

  return (
    <>
      <Hero settings={settings} featured={featured} stats={stats} />
      <SignalsTicker signals={signals} />
      <AboutStrip settings={settings} />
      <TopicsGrid topics={topics} />
      <TimelineTeaser predictions={predictions} />
    </>
  )
}
