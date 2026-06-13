import { groq } from 'next-sanity'

const postProjection = groq`{
  "_id": _id,
  title,
  "slug": slug.current,
  sentiment,
  "topic": topic->{ name, "slug": slug.current, icon },
  excerpt,
  "cover": cover{ ..., "alt": alt },
  "featured": coalesce(featured, false),
  publishedAt,
  "isRepost": coalesce(isRepost, false),
  externalUrl,
  source
}`

const fullPostProjection = groq`{
  "_id": _id,
  title,
  "slug": slug.current,
  sentiment,
  "topic": topic->{ name, "slug": slug.current, icon },
  excerpt,
  "cover": cover{ ..., "alt": alt },
  body,
  "featured": coalesce(featured, false),
  publishedAt,
  "isRepost": coalesce(isRepost, false),
  externalUrl,
  source
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  logoText,
  subscribeUrl,
  heroEyebrow,
  heroHeadline,
  heroBody,
  aboutBlocks,
  bio,
  careerRoles,
  footerTagline
}`

export const allPostsQuery = groq`*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc) ${postProjection}`

export const featuredPostsQuery = groq`*[_type == "post" && featured == true && defined(slug.current)]
  | order(publishedAt desc)[0...3] ${postProjection}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] ${fullPostProjection}`

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current) && isRepost != true].slug.current`

export const topicsQuery = groq`*[_type == "topic"] | order(order asc){
  "_id": _id,
  name,
  "slug": slug.current,
  icon,
  description,
  order,
  "essayCount": count(*[_type == "post" && references(^._id)])
}`

export const predictionsQuery = groq`*[_type == "prediction"] | order(predictedAt desc){
  "_id": _id,
  predictionText,
  predictionDateLabel,
  predictedAt,
  accuracy,
  realityText,
  realityDateLabel,
  "realityResolved": coalesce(realityResolved, false)
}`

export const signalsQuery = groq`*[_type == "signal"] | order(loggedAt desc){
  "_id": _id,
  text,
  status,
  sourceUrl,
  loggedAt
}`
