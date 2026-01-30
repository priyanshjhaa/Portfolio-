# Breaking Bad Portfolio

A professional portfolio website with a Breaking Bad theme emphasizing precision, transformation, and process.

## Design Principles

- **70/20/10 Rule**: 70% projects, 20% context, 10% personality
- **Clarity beats cleverness**: Navigable without knowing the show
- **One emotion per section**: Hero (confidence), Projects (competence), About (authenticity), Contact (approachability)
- **Restraint**: 1 accent color (copper), 1 font pair (Inter), 1 animation style (transformation)
- **Scan-first**: Recruiters grasp value in 20 seconds

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build

```bash
npm run build
npm start
```

## Customization

### Update Projects

Edit `/lib/data.ts` to add or modify projects:

```typescript
{
  id: 'project-1',
  atomicNumber: 26,        // Periodic table atomic number
  symbol: 'Fe',             // Element symbol
  elementName: 'Iron',      // Element name
  name: 'Your Project',     // Project name
  problem: '...',           // Problem statement
  approach: '...',          // Approach description
  stack: ['Next.js', 'React'], // Tech stack
  status: 'active',         // active | maintenance | archived
  githubUrl: '...',         // GitHub URL
  liveUrl: '...',           // Live demo URL
}
```

### Update About Section

Edit `/lib/data.ts`:

```typescript
export const about = {
  name: 'Your Name',
  title: 'Your Title',
  bio: 'Your 3-4 line bio...',
};
```

### Update Contact Links

Edit `/lib/data.ts`:

```typescript
export const contact = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  email: 'your.email@example.com',
};
```

### Customize Colors

Edit `/tailwind.config.ts` to modify the color palette:

```typescript
colors: {
  sand: { /* Desert tones */ },
  sage: { /* Chemical green */ },
  copper: { /* Transformation accent */ },
}
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Other Platforms

Build the static export:

```bash
npm run build
```

Deploy the `out` directory to any static hosting service.

## Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── cards/
│   │   └── ProjectCard.tsx # Chemical element card
│   ├── sections/
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Projects.tsx    # Projects grid
│   │   ├── About.tsx       # About section
│   │   └── Contact.tsx     # Contact section
│   └── ui/
│       └── Navigation.tsx  # Sticky navigation
├── lib/
│   ├── data.ts             # Project & content data
│   └── utils.ts            # Utility functions
├── types/
│   └── project.ts          # TypeScript interfaces
└── tailwind.config.ts      # Tailwind configuration
```

## Accessibility

- WCAG AA compliant color contrasts
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Reduced motion support

## License

MIT
