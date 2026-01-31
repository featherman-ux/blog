import { getRssString } from '@astrojs/rss';

import { SITE, METADATA } from 'astrowind:config';
import { fetchEntries } from '~/utils/entries';

export const GET = async () => {
  const entries = await fetchEntries();

  const rss = await getRssString({
    title: `${SITE.name} · Library Feed`,
    description: METADATA?.description || 'Reading log by Niels Veerman',
    site: import.meta.env.SITE,

    items: entries.map((entry) => ({
      link: new URL(entry.permalink, import.meta.env.SITE).toString(),
      title: entry.title,
      description: entry.summary,
      pubDate: entry.date,
    })),

    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
