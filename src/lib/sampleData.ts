import type {
  Post,
  Prediction,
  Signal,
  SiteSettings,
  Topic,
} from './types'

/**
 * Bundled sample content.
 *
 * This mirrors the Sanity content model exactly so the entire site renders with
 * the real design BEFORE any CMS is connected. The data-access layer (data.ts)
 * returns these objects whenever `isSanityConfigured` is false.
 */

export const sampleSiteSettings: SiteSettings = {
  logoText: 'Loren.thinks',
  subscribeUrl: 'https://buttondown.email/lorenthinks',
  heroEyebrow: 'Field notes from the shift',
  heroHeadline:
    'I write about how AI is *quietly rewriting* the rules of\nbusiness, life, and society.',
  heroBody:
    'I am a technology executive watching a once-in-a-generation platform shift from the inside. These are my honest notes — equal parts genuine excitement and real fear — on where AI is actually working, where it is breaking, and what it does to the way we organize, build, and defend.',
  aboutBlocks: [
    {
      _key: 'a1',
      heading: 'The perspective',
      body: 'A CTO in higher education with one foot in the budget meeting and one foot in the model release notes. I care less about the hype cycle and more about what survives contact with a real org chart, a real security review, and a real Tuesday.',
    },
    {
      _key: 'a2',
      heading: 'Why two timelines',
      body: 'It is easy to sound smart predicting the future and never get graded. So I grade myself in public: a running ledger of what I predicted against what actually happened — right, wrong, or still too early to call.',
    },
  ],
  bio: [
    {
      _type: 'block',
      _key: 'b1',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'b1s',
          text: 'I am the Chief Technology Officer at a graduate business school, where I lead infrastructure, software engineering, client services, and the slow, unglamorous work of business transformation. My job is to translate a torrent of AI capability into systems that real people can trust on a real deadline.',
          marks: [],
        },
      ],
    },
    {
      _type: 'block',
      _key: 'b2',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'b2s',
          text: 'I started writing because the gap between the demo and the deployment kept widening, and almost nobody was writing honestly from the deployment side. This site is my attempt to do that: to be specific, to be graded, and to admit fear and excitement in the same paragraph.',
          marks: [],
        },
      ],
    },
  ],
  careerRoles: [
    {
      _key: 'r1',
      title: 'Chief Technology Officer',
      organization: 'Graduate School of Business',
      period: '2021 — present',
      description:
        'Lead technology strategy, infrastructure, software engineering, and business transformation across the institution.',
    },
    {
      _key: 'r2',
      title: 'Director of Engineering',
      organization: 'Higher-Ed Platform Group',
      period: '2016 — 2021',
      description:
        'Built and scaled the engineering org behind student, faculty, and research systems.',
    },
    {
      _key: 'r3',
      title: 'Principal Architect',
      organization: 'Enterprise Software',
      period: '2010 — 2016',
      description:
        'Designed distributed systems and led security architecture for regulated workloads.',
    },
  ],
  footerTagline:
    'Honest notes on the AI shift — graded in public, written from the deployment side.',
}

export const sampleTopics: Topic[] = [
  {
    _id: 'topic-org',
    name: 'Org design in the AI era',
    slug: 'org-design',
    icon: 'building',
    description:
      'What modern departments actually look like when half the work is delegated to models — and which org charts quietly stopped making sense.',
    order: 1,
    essayCount: 6,
  },
  {
    _id: 'topic-reality',
    name: 'Working vs. not working',
    slug: 'working-vs-not',
    icon: 'sparkles',
    description:
      'Where AI is genuinely earning its keep in production, and where the demo never survives a real Tuesday.',
    order: 2,
    essayCount: 9,
  },
  {
    _id: 'topic-hardware',
    name: 'Hardware & software',
    slug: 'hardware-software',
    icon: 'cpu',
    description:
      'Silicon, inference economics, and the software stacks being rebuilt around models instead of around requests.',
    order: 3,
    essayCount: 5,
  },
  {
    _id: 'topic-security',
    name: 'Security & attack vectors',
    slug: 'security',
    icon: 'shield',
    description:
      'New attack surfaces — prompt injection, data exfiltration, supply chains — and the defenses that lag a release behind.',
    order: 4,
    essayCount: 7,
  },
]

const topicRef = (t: Topic) => ({ name: t.name, slug: t.slug, icon: t.icon })

export const samplePosts: Post[] = [
  {
    _id: 'post-1',
    title: 'The org chart was the first thing AI broke',
    slug: 'org-chart-broke-first',
    sentiment: 'watching',
    topic: topicRef(sampleTopics[0]),
    excerpt:
      'Before AI touched a single workflow, it quietly invalidated the assumption every department was built on: that headcount is the unit of capacity.',
    cover: null,
    featured: true,
    publishedAt: '2026-05-28T09:00:00.000Z',
    isRepost: false,
    body: [
      paragraph(
        'p1',
        'For thirty years we sized departments in people. A team that needed more throughput hired more people; a team with slack lost a req. AI did not change the work first — it changed the unit. When a single engineer plus a model can do the output of four, the org chart is suddenly measuring the wrong thing.',
      ),
      paragraph(
        'p2',
        'The leaders adapting fastest are the ones who stopped asking "how many people do we need" and started asking "how much judgment do we need, and where does it have to live." That is a genuinely different question, and most performance-review software cannot even represent the answer yet.',
      ),
    ],
  },
  {
    _id: 'post-2',
    title: 'Where AI is actually working in my building',
    slug: 'actually-working',
    sentiment: 'optimism',
    topic: topicRef(sampleTopics[1]),
    excerpt:
      'Not the demos. The boring, durable wins: drafting, triage, summarization, and the long tail of "someone used to do this by hand."',
    cover: null,
    featured: true,
    publishedAt: '2026-05-14T09:00:00.000Z',
    isRepost: false,
    body: [
      paragraph(
        'p1',
        'The wins that stuck were never the flashy ones. They were the tasks nobody wanted: reconciling two spreadsheets, summarizing a 40-page vendor contract, turning a messy ticket into a clean one. Unglamorous, high-volume, low-stakes-if-wrong. That is the sweet spot, and it is bigger than the keynote suggests.',
      ),
      paragraph(
        'p2',
        'The pattern: AI works where a human still signs off, the cost of a miss is low, and the task was already half-procedural. Everywhere we tried to remove the human entirely, we quietly added one back within a quarter.',
      ),
    ],
  },
  {
    _id: 'post-3',
    title: 'Prompt injection is the new SQL injection, and we are not ready',
    slug: 'prompt-injection',
    sentiment: 'concern',
    topic: topicRef(sampleTopics[3]),
    excerpt:
      'Every agent that reads untrusted text is an open API into your systems. We learned this lesson once already. We are about to learn it again, expensively.',
    cover: null,
    featured: true,
    publishedAt: '2026-04-30T09:00:00.000Z',
    isRepost: false,
    body: [
      paragraph(
        'p1',
        'In 2005 we learned not to concatenate user input into a SQL string. In 2026 we are gleefully concatenating untrusted web pages, emails, and documents into model context and then handing that model tools. It is the same class of mistake wearing a new coat.',
      ),
      paragraph(
        'p2',
        'The uncomfortable part: there is no parameterized query for natural language. The mitigations are real but partial — least privilege, human-in-the-loop on side effects, content provenance. Anyone selling you a clean fix is selling.',
      ),
    ],
  },
  {
    _id: 'post-4',
    title: 'The inference bill is the strategy',
    slug: 'inference-bill',
    sentiment: 'watching',
    topic: topicRef(sampleTopics[2]),
    excerpt:
      'You can read a company’s real AI strategy off its compute budget. Everything else is a press release.',
    cover: null,
    featured: false,
    publishedAt: '2026-04-12T09:00:00.000Z',
    isRepost: false,
    body: [
      paragraph(
        'p1',
        'Token economics quietly decides which features ship. A capability that is magical at 10 cents a call and absurd at 10 dollars a call is the same capability — the price is the product decision. Watch where the GPUs go, not where the slides point.',
      ),
    ],
  },
  {
    _id: 'post-5',
    title: 'Repost: "The hollow promise of fully autonomous agents"',
    slug: 'repost-hollow-agents',
    sentiment: 'concern',
    topic: topicRef(sampleTopics[1]),
    excerpt:
      'A sharp outside piece on why end-to-end autonomy keeps collapsing back into supervised tooling. Worth your time — it matches what I see in production.',
    cover: null,
    featured: false,
    publishedAt: '2026-03-22T09:00:00.000Z',
    isRepost: true,
    externalUrl: 'https://example.com/hollow-promise-of-autonomous-agents',
    source: 'The Latent Space',
  },
]

export const samplePredictions: Prediction[] = [
  {
    _id: 'pred-1',
    predictionText:
      'By end of 2025, most "AI agent" products in the enterprise will quietly add a mandatory human approval step for any irreversible action.',
    predictionDateLabel: 'Predicted — Mar 2025',
    predictedAt: '2025-03-10T00:00:00.000Z',
    accuracy: 'right',
    realityText:
      'Confirmed. Every major agent platform shipped human-in-the-loop gating for writes and payments by Q4. Full autonomy demos stayed demos.',
    realityDateLabel: 'Resolved — Dec 2025',
    realityResolved: true,
  },
  {
    _id: 'pred-2',
    predictionText:
      'A major company will suffer a public data breach traced directly to prompt injection against an internal AI assistant before mid-2026.',
    predictionDateLabel: 'Predicted — Jun 2025',
    predictedAt: '2025-06-01T00:00:00.000Z',
    accuracy: 'tbd',
    realityText:
      'Several near-misses and responsible-disclosure reports, but no confirmed headline breach yet. Still watching closely.',
    realityDateLabel: 'Still watching',
    realityResolved: false,
  },
  {
    _id: 'pred-3',
    predictionText:
      'On-device / small models will NOT displace frontier API usage for serious enterprise work within two years — the capability gap holds.',
    predictionDateLabel: 'Predicted — Jan 2025',
    predictedAt: '2025-01-15T00:00:00.000Z',
    accuracy: 'wrong',
    realityText:
      'Partly wrong. Small models took far more routine workload than I expected; routing between local and frontier became standard faster than predicted.',
    realityDateLabel: 'Resolved — Apr 2026',
    realityResolved: true,
  },
]

export const sampleSignals: Signal[] = [
  {
    _id: 'sig-1',
    text: 'Frontier lab ships sub-second tool-calling latency — agent UX inflection incoming.',
    status: 'watching',
    sourceUrl: 'https://example.com/signal-latency',
    loggedAt: '2026-06-10T14:00:00.000Z',
  },
  {
    _id: 'sig-2',
    text: 'Second Fortune-500 confirms it now budgets inference as a line item, not an experiment.',
    status: 'confirmed',
    sourceUrl: 'https://example.com/signal-budget',
    loggedAt: '2026-06-06T11:00:00.000Z',
  },
  {
    _id: 'sig-3',
    text: 'New prompt-injection technique bypasses three popular guardrail libraries.',
    status: 'concern',
    sourceUrl: 'https://example.com/signal-injection',
    loggedAt: '2026-06-02T16:30:00.000Z',
  },
  {
    _id: 'sig-4',
    text: 'Open-weights model closes the gap on coding benchmarks to within a single point.',
    status: 'watching',
    sourceUrl: 'https://example.com/signal-openweights',
    loggedAt: '2026-05-27T08:00:00.000Z',
  },
  {
    _id: 'sig-5',
    text: 'Regulator signals intent to treat autonomous financial agents as registered actors.',
    status: 'concern',
    sourceUrl: 'https://example.com/signal-regulation',
    loggedAt: '2026-05-20T13:00:00.000Z',
  },
]

function paragraph(key: string, text: string) {
  return {
    _type: 'block' as const,
    _key: key,
    style: 'normal' as const,
    markDefs: [],
    children: [{ _type: 'span' as const, _key: `${key}s`, text, marks: [] }],
  }
}
