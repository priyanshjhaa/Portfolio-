# A Book of Work — portfolio revamp

## Approved experience

Transform the homepage into a quiet, minimal, literal flipbook. The book is centered horizontally in the viewport, with one page at a time on desktop and mobile. The cover is centered internally; contents and chapter text are left-aligned. Images follow the text column. Reading controls sit outside the moving page: Previous at left, page count at center, Next at right. Contents, theme, and reading-mode controls stay available.

Fresh visits begin on the cover; explicit page links open their destination. Visitors may read sequentially or jump to any chapter. All project detail lives in the book, split across pages instead of compressed. Existing case-study URLs remain an alternate scrollable reading path.

## Visual requirements

| Role | Light palette |
| --- | --- |
| Background | Muted oatmeal `#D8D0C3` |
| Paper | Soft parchment `#E8E0D2` |
| Main text | Brown charcoal `#302C26` |
| Secondary text | Muted brown `#625B50` |
| Accent | Olive `#59624A` |
| Borders | Taupe `#C9C0B1` |

Second-iteration refinement: reduce light-mode glare, use softly rounded paper corners (18–28px), diffuse page shadows, and a barely visible static paper grain. Keep decorative rules minimal and preserve text contrast, content, and navigation.

Dark reading mode uses warm charcoal paper, cream text, and muted olive accents. Honor existing saved preference and system changes. Use serif headings, readable sans-serif body text, generous margins, a fine spine, faint grain, and gentle page-edge shadows. No bright colors, blue/violet/indigo, neon, colorful gradients, floating badges, runner, telemetry, pointer glow, or animated grids. Original screenshots retain their colors.

## Content order

1. Cover: Priyansh Jha — A Book of Work; portrait, positioning, availability, open-book/contents actions, email, and GitHub.
2. Contents: numbered chapters, short descriptions, project status, direct navigation.
3. Introduction: profile, ownership, working style, and portrait.
4. Project chapters: Sprout, Atlas, Execute, CodeMap, Axiom, Cinematch.
5. Toolkit: one page per capability group with related project links.
6. Process: three pages covering the six build stages.
7. Evidence: current work, receipts, and shipping history.
8. Contact: availability, email, social links, and closing note.

Each project includes an opening page (screenshot, summary, links), product story (problem, approach, impact, ownership), architecture pages (two stages each), judgment (decision, tradeoff, next step), and two evidence pages (proof, architecture notes, stack, operating signals). All source content remains available. Sprout's current prototype and planned runtime must be explicitly distinguished.

## Technical design

- Typed manifest with stable page/chapter IDs, titles, templates, and source-data references; derive page numbers from order.
- Shared server-rendered templates and a small client reader shell. Static content remains readable without JavaScript.
- Existing `motion/react` plus CSS perspective; approximately 450ms sequential page turn around the vertical spine. Animate transform/opacity only. Contents jumps fade directly to their destination.
- Lock sequential controls during a turn. Hide outgoing decorative copies from accessibility and focus. Focus the new heading and announce page/chapter after navigation. Reduced motion changes pages immediately.
- Hash URLs such as `/#book/sprout-overview`, browser Back/Forward, refresh, and direct links. Invalid IDs open Contents. Map old intro/work/skills/process/evidence/contact hashes to book pages.
- Buttons, scoped arrow keys, and horizontal swipes; ignore gestures originating on interactive controls and never hijack vertical scrolling.
- Reading mode renders all pages in normal document flow. Use it without JavaScript and on short/narrow viewports where the book would compromise reading. Never shrink or clip text to fit a fixed sheet; allow document overflow when necessary.
- Preserve `/systems/[id]` as static editorial case studies and return visitors to their corresponding chapter.
- Load cover imagery first; defer project imagery and keep dimensions explicit. Optimize assets directly because static image optimization is disabled in this project.

## Delivery sequence

1. Requirements, manifest, paper tokens, cover, contents, and reader shell.
2. Full project chapters and architecture/evidence templates.
3. Toolkit, process, evidence, contact, and editorial case-study routes.
4. Responsive, navigation, accessibility, and loading verification.

## Acceptance

- All six projects, complete details, screenshots, and source/product links remain reachable.
- Contents, sequential controls, arrow keys, gestures, hash links, reload, and browser history work.
- Hidden pages cannot receive focus; reduced motion loses no information; theme and reader controls remain available on phones.
- Test 375px, 768px, 1024px, 1440px, landscape phones, 200% zoom, light/dark, and no JavaScript.
- TypeScript, production static build, and whitespace checks pass. Inspect contrast, image sizing, layout stability, and browser console. Run Lighthouse where tooling is available and report any test limitations accurately.
- No commits, pushes, or deployment unless requested.
