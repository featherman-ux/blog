import { z, defineCollection } from 'astro:content';
const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),
      canonical: z.string().url().optional(),
      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),
      description: z.string().optional(),
      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const entriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    kind: z.enum(['book', 'paper', 'essay']),
    theme: z.enum(['subconscious', 'tech-society', 'misc']),
    tags: z.array(z.string()).optional(),
    summary: z.string(),
    sourceTitle: z.string().optional(),
    sourceAuthor: z.string().optional(),
    sourceLink: z.string().url().optional(),
    rating: z.number().int().min(1).max(5).optional(),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
    nowReading: z.boolean().optional(),
    metadata: metadataDefinition(),
  }),
});

export const collections = {
  entries: entriesCollection,
};
