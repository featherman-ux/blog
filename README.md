# Niels' notebook

Tiny Astro 5 + Tailwind site. No CMS, no theme manifesto. Everything is Markdown in `src/content/entries`.

## Run it locally

```bash
npm install
npm run dev   # localhost:4321
npm run build # static output in ./dist
```

## Routes

- `/` - hero blurb + empty-state "Latest" list
- `/library` - card list or a "Nothing here yet" message
- `/notes/[slug]` – individual entry
- `/about` – short bio
- `/rss.xml` – feed generated from the entries collection

## Content model (`src/content/entries`)

```md
---
title: 'Test note'
date: 2026-01-31       # ISO date
kind: essay            # book | paper | essay
theme: misc            # subconscious | tech-society | misc
summary: '(coming soon)'
tags: []               # optional
sourceTitle: ''        # optional
sourceAuthor: ''       # optional
sourceLink: ''         # optional URL
rating: 3              # optional (books/papers)
draft: false
---

Nothing here yet.
```

Rules:
- `summary` is required even if it's just "(coming soon)".
- Draft entries (`draft: true`) stay out of every list/feed.
- Optional metadata (tags, rating, source fields) is ignored when blank.

## Add a new note

1. Duplicate `src/content/entries/test-note.md` and rename the file.
2. Update the frontmatter + body text.
3. `npm run dev` (or `npm run build`) will validate the schema.
4. Commit + push to trigger Cloudflare Pages.

That's it. If the site looks empty, that's because it is.
