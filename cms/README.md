# KreditFin Blog Studio

A standalone [Sanity](https://sanity.io) Studio your client uses to write and
publish blog posts, which the main Next.js site reads from automatically.

## One-time setup

1. `cd cms && npm install`
2. `npx sanity login` (opens a browser — sign up free, no card required)
3. `npx sanity init --env` — creates a new Sanity project and writes
   `.env` for you with `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET`.
   When it asks, choose **"Use the existing configuration"** since
   `sanity.config.ts` / schema already exist here.
4. Copy the same `SANITY_STUDIO_PROJECT_ID` value into the main app's
   `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID` (and
   `NEXT_PUBLIC_SANITY_DATASET`, usually `production`).

## Running the Studio

```
npm run dev
```

Opens the editor at `http://localhost:3333`. Your client logs in here to
write posts — title, excerpt, cover image, and a rich body editor that
supports headings, paragraphs, bullet lists, comparison tables, an FAQ
block, and a checklist block.

## Deploying the Studio (so the client doesn't need your laptop running)

```
npm run deploy
```

Sanity hosts it for free at `https://<your-project>.sanity.studio`.

## Migrating the existing "Personal Loan vs App Loan" post

The website currently ships that one post as local fallback content so it
keeps working before the CMS exists. Once you've done the setup above, run:

```
npm run seed:personal-loan-vs-app-loan
```

This uploads the cover image and creates the post in Sanity. The website
picks it up automatically on the next request — no code changes needed.

## How the website decides what to show

- `/blogs` fetches the post list from Sanity. If Sanity has zero posts (not
  configured yet, or nothing published), it shows a small local placeholder
  list instead of a blank page.
- `/blogs/[slug]` fetches that one post from Sanity by slug. If it's not
  found there *and* the slug is `personal-loan-vs-app-loan`, it renders the
  local fallback article. Any other missing slug is a 404.

Once every post exists in Sanity, the local fallback code
(`src/components/blog/fallbackPersonalLoanVsAppLoan.tsx` and the
`fallbackBlogs` array in `src/app/blogs/page.tsx`) can be deleted.
