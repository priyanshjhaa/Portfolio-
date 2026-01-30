# GTA: San Andreas Portfolio

A professional portfolio website inspired by GTA: San Andreas — designed like an in-game HUD dashboard with missions, builds, stats, and skill trees.

## Design Principles

- **Gaming HUD Aesthetic**: Dark dashboard interface with subtle grid overlays, glowing accents, and game-like status indicators
- **Mission-Based Narrative**: Career progression framed as "missions" and "checkpoints"
- **Stat-Driven Skills**: Capabilities presented as "build stats" with skill categories
- **70/20/10 Rule**: 70% projects, 20% context, 10% personality
- **Scan-First**: Recruiters grasp value in 20 seconds
- **Restraint**: 1 accent color (green), 1 font (Inter), minimal animations

## Visual Theme

### Color Palette
- **Background**: `#0D0D0D` - Deep dark base
- **Primary Text**: `#E5E5E5` - Off-white for readability
- **Accent**: `#4CAF50` - GTA green (HUD markers, mission complete indicators)
- **Borders**: `#1A1A1A` - Subtle card and element borders

### Design Elements
- **Grid Pattern**: Subtle overlay (0.015 opacity) mimicking game world coordinates
- **Glow Effects**: Pulsing accent glows for active states and markers
- **Asymmetric Layout**: Corner accents on top-left only, creating visual interest
- **Status Cards**: Muted labels with larger, bolder values for hierarchy
- **Checkpoints**: Circular markers with pulse animations for completed missions

### Typography
- **Font**: Inter (clean, modern, gaming UI-friendly)
- **Hierarchy**: Ultra-small uppercase labels (8-10px) with larger content
- **Tracking**: Wide letter-spacing (0.2-0.25em) for headers

### Animations
- **Glow Pulse**: Subtle breathing effect on background glows
- **Checkpoint Pulse**: Ring pulse on completed mission markers
- **Skill Fill**: Bars animate width on scroll
- **Slide In**: Timeline items enter from left
- **Mobile Gradient Shift**: Gentle background animation on mobile (15s cycle)

### Section Structure (GTA-Themed)
1. **Hero** - Player status with name, title, and capability cards
2. **Projects (Builds)** - Featured and completed builds with tech stacks
3. **About (Stats)** - Player bio with territory and status indicators
4. **Timeline (Mission Log)** - Career progression as completed checkpoints
5. **Skills (Build Stats)** - Capability trees organized by category
6. **Contact (Connection)** - Link cards for GitHub, LinkedIn, Email
7. **Footer** - "Designed and built by [Name]"

## Tech Stack

- **Framework**: Next.js 16.1.4 (App Router) with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Hooks**: useState, useEffect, useRef (IntersectionObserver for scroll animations)

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
  name: 'Your Project',
  description: '...',
  longDescription: '...',
  tags: ['Next.js', 'React', 'TypeScript'],
  githubUrl: 'https://github.com/username/repo',
  liveUrl: 'https://your-project.com',
  featured: true,  // Shows in "In Progress" section
}
```

### Update Timeline (Mission Log)

Edit `/lib/data.ts`:

```typescript
export const timeline: TimelineEntry[] = [
  {
    id: '1',
    type: 'education',
    title: 'Your Degree',
    organization: 'University Name',
    period: '2023 - Present',
    description: '...',
    completed: true,
    icon: 'GraduationCap',
  },
  // ...
];
```

### Update Skills (Build Stats)

Edit `/lib/data.ts`:

```typescript
export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    description: 'UI frameworks & libraries',
    skills: [
      { id: '1', name: 'React', level: 90, category: 'Frontend' },
      // ...
    ],
  },
  // ...
];
```

### Update About Stats

Edit `/components/sections/About.tsx`:

```typescript
const stats = [
  { label: 'CS', value: 'Student', color: 'text-text-primary' },
  { label: 'ON', value: 'Grind', color: 'text-accent' },
  // ...
];
```

### Customize Colors

Edit `/tailwind.config.ts`:

```typescript
colors: {
  accent: '#4CAF50',  // Change this for different theme color
  // Other colors depend on accent for consistency
}
```

## Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles & animations
├── components/
│   ├── cards/
│   │   └── ProjectCard.tsx # Project display card
│   ├── sections/
│   │   ├── Hero.tsx        # Player status
│   │   ├── Projects.tsx    # Builds section
│   │   ├── About.tsx       # Stats section
│   │   ├── Timeline.tsx    # Mission log (NEW)
│   │   ├── Skills.tsx      # Build stats (NEW)
│   │   └── Contact.tsx     # Connection section
│   └── ui/
│       └── Navigation.tsx  # Sticky nav with links
├── lib/
│   ├── data.ts             # All content data
│   └── utils.ts            # Utility functions
├── types/
│   ├── project.ts          # Project interfaces
│   └── skill.ts            # Skill & timeline interfaces
└── tailwind.config.ts      # Tailwind configuration
```

## Accessibility

- WCAG AA compliant color contrasts
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Reduced motion support via `prefers-reduced-motion`
- Touch-friendly tap targets (44px minimum on mobile)

## Mobile Responsiveness

The portfolio is fully responsive with mobile-first approach:
- Stacked vertical layout on small screens
- Reduced grid intensity for readability
- Touch-friendly tap targets (44-48px minimum)
- Responsive text sizing (8-10px labels on mobile, larger on desktop)
- Gentle gradient animation exclusive to mobile

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

Deploy the `.next` directory to any hosting service.

## License

MIT
