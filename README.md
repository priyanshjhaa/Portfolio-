# Priyansh Jha | Product Engineer Portfolio

A single-page portfolio for a full-stack product engineer building developer tools, workflow systems, and reliable SaaS products. It is designed to help founders, hiring teams, and engineers quickly inspect shipped work, product judgment, and the system decisions behind each build.

## Experience

- **Editorial homepage:** a calm hero with a live terminal line, a README-style `whoami` section with a stack constellation, selected work with the key decision behind each project, the build approach, a build log, and contact.
- **Honest project status:** projects without a public deployment show their real state ("In active build", "Deployment pending") and offer a prefilled "Request a walkthrough" email instead of a missing link.
- **Case studies:** `/systems/<id>` pages cover the problem, approach, defining decision and tradeoff, a step-through architecture flow with the safeguard at each stage, what is built, and what is next.
- **Search:** `Cmd/Ctrl + K` opens a keyboard-first palette for projects, sections, contact links, and the CV.
- **Share cards:** each page gets a branded 1200×630 preview image, rendered at build time to `/og/<page>.png`.

## Design System

- **Surfaces:** warm paper (light) and ink (dark), switchable and following the system setting by default.
- **One accent:** a clay red used sparingly for emphasis, active states, and status.
- **Type:** Newsreader (serif display), Geist (body), and Geist Mono (labels), loaded with `next/font` so every platform renders the same typography.
- **Depth:** a shared shadow scale, frosted glass surfaces, and recessed section plates.
- **Motion:** slow and supportive: an ambient colour field, gentle parallax, staggered lists, and scroll-drawn lines (`components/motion/`). Everything is static with reduced motion, and parallax is off below 768px.
- **Tokens:** every color lives as a CSS variable in `app/globals.css`; components use plain, named classes from the same file.

## Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS and Motion
- Lucide icons
- Local portfolio data and static project screenshots

## Project Structure

```text
app/
  page.tsx                 # Homepage composition
  systems/[id]/page.tsx    # Case-study pages (statically generated)
  layout.tsx               # Fonts, metadata, theme bootstrapping
  og/[slug]/route.tsx      # Share card images, generated at build time
  globals.css              # Design tokens and component styles
components/
  site/                    # Navigation, command palette, theme switch, footer, reveal-on-scroll
  home/                    # Hero, about (README + stack map), selected work, approach, build log, contact
  project/                 # Case study and architecture flow
  motion/                  # Ambient field, parallax, stagger, draw-line
  fun/                     # Dot field, system graph, terminal line, mini Priyansh
lib/data.ts                # Portfolio content (single source of truth)
lib/project-state.ts       # Honest status labels and walkthrough links
lib/og.tsx                 # Share card renderer
public/projects/           # Project screenshots
public/resume.pdf          # CV (linked from Contact and the palette)
```

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation and Production

```bash
npx tsc --noEmit --incremental false
npm run lint
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the live domain so share images get absolute URLs (Vercel builds fall back to their production URL).

## Updating Content

`lib/data.ts` is the primary source of truth for portfolio content.

- Add or update projects, stacks, GitHub/live links, and selected-work status in `projects`.
- Maintain each project’s case-study content through its proof points, architecture notes, ownership, tradeoffs, and production signals.
- Update hero positioning, current shipping notes, receipts, and operating principles in the same file.
- Place product screenshots at `public/projects/<project-id>/landing.jpg` and reference them from the corresponding project entry.
- For a project without a public deployment, set `availability` (`in-build` or `deployment-pending`) with a short note; remove it and add `liveUrl` once it ships.

## Accessibility and Responsive Behavior

- Semantic landmarks, a skip link, and visible focus states throughout.
- Command palette and architecture flow are fully keyboard operable (arrow keys, Enter, Escape).
- Layouts are tested from 390px phones to wide desktops with no horizontal scrolling.
- Reduced-motion support for every transition and reveal.

## License

MIT
