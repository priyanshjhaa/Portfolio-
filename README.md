# Priyansh Jha | Product Engineer Portfolio

A single-page portfolio for a full-stack product engineer building developer tools, workflow systems, and reliable SaaS products. It is designed to help founders, hiring teams, and engineers quickly inspect shipped work, product judgment, and the system decisions behind each build.

## Live Experience

- **Homepage:** startup-focused positioning, selected work, engineering receipts, working principles, and contact paths.
- **Project deep dives:** dedicated system pages for CodeMap, Execute, Axiom, and Cinematch with product proof, architecture flows, ownership, production signals, and links.
- **Build explorer:** a keyboard-first command palette for searching projects, skills, and contact actions with `Cmd/Ctrl + K`.
- **Visual proof:** real project landing-page screenshots are framed directly inside the selected-work cards and system pages.

## Design System

The interface is intentionally distinct without being visually noisy:

- **Graphite canvas:** warm dark surfaces with bone-white typography for sustained readability.
- **Stone and clay accents:** muted stone for system states and restrained clay for primary actions, featured work, and live signals.
- **Continuous background:** subtle grid, dot, contour, and guide-line textures span the whole page without section dividers.
- **Ambient interaction:** a slow global gradient drift and desktop-only cursor aura create depth behind the content.
- **Reduced motion:** decorative motion and cursor effects disable cleanly when `prefers-reduced-motion` is enabled.

## Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS
- Lucide icons
- Local portfolio data and static project screenshots

## Project Structure

```text
app/
  page.tsx                 # Single-page portfolio and section state
  systems/[id]/page.tsx    # Dedicated project system pages
  layout.tsx               # Global texture, gradient, and cursor layers
  globals.css              # Visual system, motion, textures, and accessibility rules
components/
  sections/                # Hero, projects, leverage, receipts, process
  ui/                      # Navigation, explorer, pointer effects, project deep dive
lib/data.ts                # Portfolio copy, projects, proof, and project metadata
public/projects/           # Project landing-page screenshots
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
npm run build
npm start
```

## Updating Content

`lib/data.ts` is the primary source of truth for portfolio content.

- Add or update projects, stacks, GitHub/live links, and selected-work status in `projects`.
- Maintain each project’s case-study content through its proof points, architecture notes, ownership, tradeoffs, and production signals.
- Update hero positioning, current shipping notes, receipts, and operating principles in the same file.
- Place product screenshots at `public/projects/<project-id>/landing.png` and reference them from the corresponding project entry.

## Accessibility and Responsive Behavior

- Semantic headings, buttons, and links throughout.
- Keyboard-accessible explorer with escape-to-close and focus-aware behavior.
- Responsive selected-work cards and system pages for mobile through desktop.
- Desktop-only cursor effects; touch layouts remain clean and interaction-safe.
- Reduced-motion support for all ambient animation and reveal treatments.

## License

MIT
