import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Entry } from '~/types';

const normalizeEntry = async (entry: CollectionEntry<'entries'>): Promise<Entry> => {
  const { Content } = await render(entry);
  const data = entry.data;
  return {
    id: entry.id,
    slug: entry.slug,
    permalink: `/notes/${entry.slug}`,
    title: data.title,
    summary: data.summary,
    date: data.date,
    kind: data.kind,
    theme: data.theme,
    tags: data.tags,
    sourceTitle: data.sourceTitle,
    sourceAuthor: data.sourceAuthor,
    sourceLink: data.sourceLink,
    rating: data.rating,
    featured: data.featured,
    nowReading: data.nowReading,
    draft: data.draft,
    metadata: data.metadata,
    Content,
    body: entry.body,
  } satisfies Entry;
};

let cachedEntries: Entry[] | undefined;

const sortEntries = (entries: Entry[]) =>
  entries.sort((a, b) => b.date.valueOf() - a.date.valueOf());

export const fetchEntries = async ({ includeDrafts = false }: { includeDrafts?: boolean } = {}) => {
  if (!cachedEntries || includeDrafts) {
    const all = await getCollection('entries');
    const normalized = await Promise.all(all.map((entry) => normalizeEntry(entry)));
    const ordered = sortEntries(normalized);
    if (!includeDrafts) {
      cachedEntries = ordered.filter((entry) => !entry.draft);
    }
    return includeDrafts ? ordered : cachedEntries!;
  }

  return cachedEntries;
};

export const getEntryBySlug = async (slug: string) => {
  const entries = await fetchEntries();
  return entries.find((entry) => entry.slug === slug);
};

export const getLatestEntries = async (count = 5) => {
  const entries = await fetchEntries();
  return entries.slice(0, count);
};

export const getRelatedEntries = async (target: Entry, limit = 3) => {
  const entries = await fetchEntries();
  const targetTags = new Set(target.tags ?? []);

  return entries
    .filter((entry) => entry.slug !== target.slug)
    .map((entry) => {
      let score = 0;
      if (entry.theme === target.theme) score += 2;
      entry.tags?.forEach((tag) => {
        if (targetTags.has(tag)) score += 1;
      });
      return { entry, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
};
