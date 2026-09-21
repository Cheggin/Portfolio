# Reagan Hsu's Portfolio

Minimalist portfolio website built with React, TypeScript, and Vite.

## Setup

```bash
npm install
npm run dev
```

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (visitor tracking)
- Vercel Analytics
- React Router

## Structure

- `/src/pages` - Page components (Home, Projects, Blog, Archive, Contact)
- `/src/components` - Shared components (Stats)
- `/public/v1` - Archived V1 portfolio (static build)

## Flow Free

The interactive simulator and research notes live at `/writing/flow-free`.
Its model and React components are in `src/components/flow-free`; the article is
`src/content/blog/flow-free.mdx`. The simulator supports pointer drawing,
animated solution playback, SVG export, and both portfolio themes. See the
component directory's README for its import surface.
