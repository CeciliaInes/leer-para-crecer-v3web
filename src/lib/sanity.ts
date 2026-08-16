import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
export const sanityDataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'
export const sanityApiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) || '2026-08-15'

export const sanityEnabled = Boolean(sanityProjectId)

export const sanityClient = sanityEnabled
  ? createClient({
      projectId: sanityProjectId!,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
    })
  : null

const builder = sanityEnabled
  ? imageUrlBuilder({ projectId: sanityProjectId!, dataset: sanityDataset })
  : null

export function sanityImage(source: unknown) {
  if (!builder || !source) return ''
  return builder.image(source).auto('format').fit('crop').url()
}

export type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  category?: string
  coverImage?: unknown
  body?: unknown[]
}

export async function fetchPosts(): Promise<Post[]> {
  if (!sanityClient) return []
  return sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt, category, coverImage, body
  }`)
}

export async function fetchPost(slug: string): Promise<Post | null> {
  if (!sanityClient) return null
  return sanityClient.fetch(`*[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, publishedAt, category, coverImage, body
  }`, { slug })
}
