import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Library',
      href: getPermalink('/library'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
  ],
  actions: [{ text: 'Email me', href: 'mailto:veerman.niels@gmail.com' }],
};

export const footerData = {
  links: [
    {
      title: 'Site',
      links: [
        { text: 'Home', href: getPermalink('/') },
        { text: 'Library', href: getPermalink('/library') },
        { text: 'About', href: getPermalink('/about') },
      ],
    },
    {
      title: 'Elsewhere',
      links: [
        { text: 'Email', href: 'mailto:veerman.niels@gmail.com' },
        { text: 'Mastodon', href: 'https://fosstodon.org/@nielsveerman' },
        { text: 'GitHub', href: 'https://github.com/nielsveerman' },
        { text: 'RSS', href: getAsset('/rss.xml') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Mastodon', icon: 'tabler:brand-mastodon', href: 'https://fosstodon.org/@nielsveerman' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/nielsveerman' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    This is my website. I read stuff. I write about it.
  `,
};
