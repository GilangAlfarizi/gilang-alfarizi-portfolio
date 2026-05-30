# Portfolio v2 — Progress & Architecture

> **Living document.** Update this file whenever scope, priorities, or implementation strategy changes.  
> Last audited: **2026-05-24** (Skills API + Home/Projects responsive pass)

---

## Quick status

| Area | Status |
|------|--------|
| Tooling (Vite, React 19, TS, Tailwind 4, shadcn) | ✅ Done |
| Motion package (`motion` v12) | ✅ Wired (entrance, nav, overlays, buttons) |
| GSAP | ⬜ Not installed |
| Immersive app shell | ✅ Done (`AppShell`, layers, background) |
| Home landing overlay | ✅ Done (hero, cards, motion) |
| API layer | ✅ Projects + Certificates + Skills |
| Design tokens (cinematic / glass) | 🟡 Syne display + Inter body; glass utilities |

**Current focus:** Phase 7 About overlay → Phase 8 project detail modal

---

## Vision

Remake the portfolio as **one persistent immersive application** — not a traditional multi-page site.

| Principle | Intent |
|-----------|--------|
| Cinematic | Full-bleed imagery, deliberate pacing, motion hierarchy |
| Immersive | Single world; content layers animate over a fixed background |
| Futuristic / premium | Glass surfaces, depth, restrained palette, expressive typography |
| Motion-first | Framer Motion (`motion`) for UI transitions; GSAP later for scroll choreography |
| Minimal but expressive | Few elements, strong composition, no visual noise |

**Anti-patterns to avoid:** stacked document sections, route-per-page feel, animation spam, deep DOM trees, layout-thrashing transforms, unnecessary re-renders during transitions.

---

## Tech stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Runtime | React 19 + TypeScript | Strict mode enabled |
| Build | Vite 8 | `@` alias in `vite.config.ts` + `tsconfig.app.json` ✅ |
| Styling | Tailwind CSS 4 + shadcn (`radix-maia`) | Extend tokens for glass + cinematic spacing |
| Motion (primary) | `motion` v12 (`import { motion } from "motion/react"`) | Layout, overlays, hover, shared layout |
| Motion (secondary) | GSAP + ScrollTrigger | Phase 9 — pinned sections, timelines |
| Icons | lucide-react + `simple-icons` (curated registry) | Skills tiles: SVG paths, emerald `currentColor`; Lucide for missing brands (e.g. AWS) |
| Data | REST fetch | [Portfolio API](https://gilang-alfarizi-portfolio-be.vercel.app/docs) — `VITE_API_BASE_URL` |
| Typography | Syne (display) + Inter (body) | `@fontsource-variable/syne` + Inter |

---

## Experience model

### Layer stack (bottom → top)

```
┌─────────────────────────────────────────────┐
│  Overlay content (Home | Projects | …)      │  ← AnimatePresence, centered
├─────────────────────────────────────────────┤
│  Atmospheric overlays (vignette, grain, etc.) │  ← Optional, low opacity
├─────────────────────────────────────────────┤
│  Navbar (global, glass)                     │
├─────────────────────────────────────────────┤
│  Footer (global, glass)                     │
├─────────────────────────────────────────────┤
│  Persistent fullscreen background image     │  ← Never unmounts
└─────────────────────────────────────────────┘
```

### Navigation model

- **State-driven views**, not URL-first MPA (React Router optional later for deep links).
- Primary sections: `home` | `projects` | `certificates` | `about`.
- Navbar: always visible, click to switch section, animated active indicator.
- **Future:** swipe / touchpad direction navigation (prepare `NavigationContext` API now).

### Scroll model (within a section)

- **Not** traditional vertical page scroll through stacked sections.
- **Home:** scroll advances *sub-states* (hero → next beat); outgoing panel animates away, incoming replaces; background stays fixed.
- **Projects:** one project “scene” at a time; scroll/wheel advances project index with cinematic transition.
- **Certificates:** paginated grid (3×3); prev/next changes page with transition hook points.
- **About:** single centered composition; light scroll if content grows.

---

## Target folder structure

```
src/
├── app/
│   ├── AppShell.tsx              # Root layout: layers + providers
│   └── providers/
│       ├── NavigationProvider.tsx
│       └── MotionProvider.tsx    # reducedMotion, transition presets
├── components/
│   ├── layout/
│   │   ├── PersistentBackground.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── OverlayStage.tsx      # centers + hosts active overlay
│   ├── overlays/
│   │   ├── HomeOverlay/
│   │   ├── ProjectsOverlay/
│   │   ├── CertificatesOverlay/
│   │   └── AboutOverlay/
│   └── ui/                       # shadcn primitives
├── features/
│   ├── home/
│   ├── projects/
│   ├── certificates/
│   └── about/
├── hooks/
│   ├── useNavigation.ts
│   ├── useScrollSection.ts       # home / projects scroll choreography
│   └── usePagination.ts
├── lib/
│   ├── utils.ts
│   ├── api/
│   │   ├── client.ts
│   │   ├── projects.ts
│   │   └── certificates.ts
│   └── motion/
│       ├── presets.ts            # durations, easings, variants
│       └── transitions.ts
├── types/
│   ├── navigation.ts
│   ├── project.ts
│   └── certificate.ts
└── assets/
    └── background/               # hero / ambient images
```

---

## Design system (planned)

### Typography

| Role | Direction | Implementation |
|------|-----------|----------------|
| Display / hero | Large, tight tracking, cinematic scale | Add display font (e.g. variable sans or geometric) — Inter is body only today |
| Body | Clean, readable | `@fontsource-variable/inter` ✅ |
| Labels / nav | Small caps or wide tracking | Tailwind utilities + CSS vars |

**Tasks**

- [x] `--font-display` / `--font-heading` → Syne Variable
- [x] Body remains Inter Variable
- [ ] Define type scale utilities: `text-display`, `text-headline` (optional Tailwind aliases)
- [ ] Set max line-width for centered overlays (`max-w-prose` / custom)

### Color & surfaces

| Token | Purpose |
|-------|---------|
| `--glass-bg` | `oklch` + alpha panel fill |
| `--glass-border` | subtle edge highlight |
| `--glass-blur` | `backdrop-blur` amount (12–24px) |
| `--overlay-scrim` | darken background under text for contrast |
| `--accent-glow` | optional focus / CTA glow |

**Tasks**

- [ ] Extend `:root` / `.dark` in `src/index.css` with glass tokens
- [ ] Create `GlassPanel` component (blur, border, radius, shadow)
- [ ] Verify contrast on top of photographic background

### Spacing & layout

- Centered column: `max-w-3xl`–`max-w-5xl` for overlays
- Vertical rhythm: 8px base; cinematic sections use multiples of 24/32/48
- Safe areas: `env(safe-area-inset-*)` for mobile navbar/footer

### Motion tokens

| Token | Suggested value | Use |
|-------|-----------------|-----|
| `--motion-fast` | 0.2s | hover, micro |
| `--motion-base` | 0.45s | overlay enter/exit |
| `--motion-slow` | 0.75s | hero reveals |
| `--ease-out-expo` | cubic-bezier | cinematic deceleration |
| `--ease-in-out-smooth` | cubic-bezier | cross-fades |

Define in `src/lib/motion/presets.ts` and reference from Framer Motion `transition` props.

---

## API contracts (live backend)

**Base URL:** `https://gilang-alfarizi-portfolio-be.vercel.app`  
**Swagger UI:** [gilang-alfarizi-portfolio-be.vercel.app/docs](https://gilang-alfarizi-portfolio-be.vercel.app/docs)  
**OpenAPI JSON:** `GET /docs-json`

### Environment

```env
VITE_API_BASE_URL=https://gilang-alfarizi-portfolio-be.vercel.app
```

Default fallback is set in `src/lib/api/client.ts` if env is omitted.

### Projects ✅

| Method | Path | Notes |
|--------|------|--------|
| `GET` | `/project` | List — wrapped as `{ data: Project[] }` |
| `GET` | `/project/{id}` | Detail + `images[]` (case study / modal — Phase 8) |
| `POST` | `/project` | Admin |
| `PATCH` | `/project/{id}` | Admin |
| `DELETE` | `/project/{id}` | Admin |

**List item shape:**

```ts
{ id: number; title: string; description: string; coverImageUrl: string | null }
```

**Client:** `fetchProjects()` in `src/lib/api/projects.ts` · `useProjects()` hook

### Certificates ✅

| Method | Path | Query | Notes |
|--------|------|-------|--------|
| `GET` | `/certificate` | `page`, `pageSize` (default 9) | Paginated list |

**Response shape:**

```ts
{
  data: {
    data: Certificate[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }
}
```

**Item fields:** `id`, `title`, `issuer`, `issuedAt`, `image`, `credential` (nullable), `createdAt`, `updatedAt`

**Client:** `fetchCertificates()` · `useCertificates(page)` hook

### Skills ✅

| Method | Path | Notes |
|--------|------|--------|
| `GET` | `/skill` | `{ data: Skill[] }` — `icon` is Simple Icons slug; `type`: `FRONTEND` \| `BACKEND` \| `UI_UX` |

**Item shape:**

```ts
{ id: number; title: string; icon: string; type: "FRONTEND" | "BACKEND" | "UI_UX" }
```

**Client:** `fetchSkills()` in `src/lib/api/skills.ts` · `useSkills()` hook · `groupSkillsByType()` for categories + computed strength %

### Images

| Method | Path | Notes |
|--------|------|--------|
| `GET` | `/project/{projectId}/image` | Gallery for project detail |
| `GET` | `/image/{id}` | Single image |

### Health

| Method | Path |
|--------|------|
| `GET` | `/health` |

### Shared client

- `apiGet<T>(path)` in `src/lib/api/client.ts`
- `ApiError` for failed responses

**Tasks**

- [x] `.env.example` with production API URL
- [x] `apiGet` + project types + `fetchProjects`
- [x] `fetchCertificates` + pagination (`page`, `pageSize=9`)
- [x] `fetchSkills` + `useSkills` for Capabilities beat
- [ ] `fetchProjectById` for detail modal
- [ ] Optional: MSW mocks for offline dev

---

## Motion system architecture

### Phase A — Framer Motion (`motion`) — primary

| Capability | Approach |
|------------|----------|
| Section switch | `AnimatePresence` + `mode="wait"` on overlay key = `activeSection` |
| Layout | `layout` / `LayoutGroup` for navbar indicator |
| Hero entrance | staggered `variants` on headline, subtitle, CTA |
| Project scenes | `key={projectId}` on scene wrapper; custom exit/enter |
| Shared element (later) | `layoutId` on thumbnail → detail modal |
| Reduced motion | `useReducedMotion()` → shorten or disable |

### Phase B — GSAP — secondary (Phase 9)

| Capability | Approach |
|------------|----------|
| Scroll storytelling | ScrollTrigger + pinned containers |
| Timelines | master timeline per home “chapter” |
| Handoff | GSAP drives scroll progress; React state syncs section index |

**Rule:** Do not duplicate the same property in GSAP and Framer on one element.

### Performance rules

- Animate `transform` and `opacity` only where possible (GPU-friendly).
- `will-change` sparingly; remove after transition complete.
- Lazy-load overlay chunks: `React.lazy` per overlay once shell is stable.
- Memoize heavy list items; stable keys for project/certificate cards.
- Preload hero background (`<link rel="preload">` or priority image).
- Debounce wheel handlers for project index (≥ 400ms lock during transition).

---

## Implementation phases

### Phase 0 — Project foundation

**Goal:** Repo ready for feature work; remove Vite starter noise.

| Task | Status |
|------|--------|
| Vite + React + TS + Tailwind 4 + shadcn scaffold | ✅ |
| `motion` package installed | ✅ |
| Configure Vite `@` → `./src` alias | ✅ |
| Replace starter `App.tsx` with `AppShell` entry | ✅ |
| Add `.env.example` | ⬜ |
| Background asset in `src/assets/main-background.jpg` | ✅ |
| Remove unused starter sections / `App.css` demo styles | ✅ |

**Architecture notes**

- Keep `StrictMode` on; expect double mount in dev — design animations idempotent.
- Prefer `@/` imports consistently after Vite alias is set.

**Technical concerns**

- `tsconfig` paths without Vite `resolve.alias` break `@/` imports at runtime.

---

### Phase 1 — Global layout & persistent background

**Goal:** Full-viewport shell with fixed background; empty overlay stage.

| Task | Status |
|------|--------|
| `PersistentBackground` — `position: fixed`, `object-fit: cover`, full viewport | ✅ |
| `AppShell` — flex/grid stacking layers with explicit `z-index` scale | ✅ |
| `OverlayStage` — centered slot, hosts section overlays | ✅ |
| `Footer` — copyright + social links | ✅ |
| `AtmosphericOverlay` — vignette + top/bottom scrims | ✅ |
| Document `overflow: hidden` on `html, body` for app-like feel | ✅ |
| Z-index contract in layout components (0 → 1 → 10 → 50) | ✅ |

**UI / motion goals**

- Background loads with subtle fade-in (opacity only, no scale on huge images).
- Optional vignette overlay at 5–15% opacity.

**Performance**

- Serve WebP/AVIF background; provide fallback JPG.
- Use `fetchpriority="high"` on background img.

**Future enhancements**

- Parallax drift on background (GSAP or slow CSS transform).
- Time-of-day or theme-based background swap.

---

### Phase 2 — Navbar & navigation architecture

**Goal:** Global nav switches overlay sections with animated active state.

| Task | Status |
|------|--------|
| `NavigationProvider` + `useNavigation()` | ✅ |
| Section enum (+ `contact` for nav parity with design) | ✅ |
| `Navbar` — glass pill, logo, links, Connect CTA | ✅ |
| Animated active indicator (`layoutId="nav-underline"`) | ✅ |
| Wire nav clicks → `setActiveSection` | ✅ |
| `AnimatePresence` on `OverlayStage` keyed by section | ✅ |
| Placeholder overlays for non-home sections | ✅ |
| Mobile nav menu (hamburger + glass panel) | ✅ |
| Tablet compact nav labels (`md`–`lg`) | ✅ |

**Architecture notes**

```ts
type Section = 'home' | 'projects' | 'certificates' | 'about';

interface NavigationContextValue {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  direction: 1 | -1; // for future swipe transitions
}
```

**UI / motion goals**

- Active tab: smooth slide morph, not instant color swap.
- Section change: outgoing fade + slight Y; incoming opposite Y (respect `direction`).

**Technical concerns**

- Navbar and overlays must not remount background.
- Store `direction` when navigating left/right in nav order for consistent exit/enter.

**Future enhancements**

- Swipe / touchpad: `direction` from gesture; threshold-based section change.
- Deep linking via `?section=projects` + `history.replaceState`.

---

### Phase 3 — Home landing overlay

**Goal:** Default `home` section with cinematic hero and scroll-driven sub-states.

| Task | Status |
|------|--------|
| `HomeOverlay` composition: headline, subtitle, CTA | ✅ |
| `InfoCards` (desktop right / mobile strip) | ✅ |
| Entrance stagger (status → headline lines → subtitle → CTA → cards) | ✅ |
| `MotionButton` hover/tap micro-interactions | ✅ |
| Home beats: Hero (0) + Capabilities & Arsenal (1) | ✅ |
| `useHomeBeats` — wheel/touch beat index + inner scroll on capabilities | ✅ |
| Beat transitions (slide up/down) via `AnimatePresence` | ✅ |
| `BeatIndicator` + mobile dots | ✅ |
| Capabilities: API skills grid (`GET /skill`) by type | ✅ |
| `SkillTile` hover glow + title tooltip; `SkillIcon` (Simple Icons) | ✅ |
| Strength profile from category counts (computed %) | ✅ |
| Home responsive pass — hero safe areas, capabilities scroll, beat gutter | ✅ |
| Scroll hint on hero beat | ✅ |
| CTA → `setActiveSection('projects')` | ✅ |
| Display font — Syne Variable globally | ✅ |

**UI / motion goals**

- Hero: large display type, generous top spacing, minimal CTA (one primary button).
- Beat transitions feel like “scenes,” not accordion sections.

**Performance**

- Lock scroll handling during 450ms transition.
- Single wheel listener on `OverlayStage` or home container (passive where possible).

**Future enhancements**

- GSAP pinned timeline for home beats (Phase 9).
- Cursor-reactive ambient light on glass panel.

---

### Phase 4 — Motion system foundation

**Goal:** Shared presets, providers, and patterns used by all overlays.

| Task | Status |
|------|--------|
| `src/lib/motion/presets.ts` — durations, easings, variant factories | ✅ |
| `fadeUp`, `fadeDown`, `fadeIn`, `fadeRight`, `scaleIn`, `staggerContainer` | ✅ |
| `MotionButton` component (glass variants + hover) | ✅ |
| `MotionProvider` — `reducedMotion` flag | ⬜ |
| `OverlayTransition` wrapper component | ⬜ |
| Document when to use `mode="wait"` vs `popLayout` | ⬜ |

**Architecture notes**

- Export `transition` objects, not inline magic numbers in features.
- Use `LazyMotion` + `domAnimation` if bundle size becomes an issue.

**Technical concerns**

- Avoid animating `filter: blur()` on large areas every frame.
- Prefer `opacity` + `transform` for overlay transitions.

---

### Phase 5 — Projects overlay & transitions

**Goal:** Fetch projects; one scene at a time; scroll between projects.

| Task | Status |
|------|--------|
| Types + `fetchProjects()` | ✅ |
| Loading / error / empty states | ✅ |
| `ProjectsOverlay` — one scene per project | ✅ |
| Display: `coverImageUrl`, title, description, CTA | ✅ |
| Scroll/wheel via `useScrollCapture` + `beatSlide` transitions | ✅ |
| Index label `01 / 05` + dot indicator | ✅ |
| Section header “Curated Work” / “Digital Constellations” | ✅ |
| `useScrollCapture` shared with home beats | ✅ |
| Projects responsive pass — single-col mobile, capped image height | ✅ |
| Project detail modal (`GET /project/{id}`) | ⬜ |

**UI / motion goals**

- Each project feels like its own scene: focus on imagery + type hierarchy.
- Enter: thumbnail scales slightly in; text fades up with stagger.

**Performance**

- Lazy-load thumbnails (`loading="lazy"` except first project).
- Prefetch next/prev thumbnail on index change.

**Future enhancements**

- Fullscreen detail overlay with `layoutId` shared transition (Phase 8).
- External link / case study URL on CTA.
- Filter by tag (API permitting).

---

### Phase 6 — Certificates grid & pagination

**Goal:** 3×3 glass grid with API pagination and controls.

| Task | Status |
|------|--------|
| Types + `fetchCertificates({ page, pageSize: 9 })` | ✅ |
| `CertificatesOverlay` — responsive grid (1 / 2 / 3 cols) | ✅ |
| `CertificateCard` — cert `image`, title, issuer, `issuedAt` | ✅ |
| Scroll pagination via `useScrollCapture` (controlled `pageIndex`) | ✅ |
| Page dots + “Scroll for next page” hint | ✅ |
| Loading / error / empty states | ✅ |
| Page transition `beatSlide` + staggered card entrance | ✅ |
| `OverlaySectionHeader` shared with Projects | ✅ |
| Credential ID display / verify link | ⬜ |

**UI / motion goals**

- Cards: glass panels, subtle hover lift (`y: -4`, shadow).
- Page transition: quick crossfade or staggered card entrance (max 9 items).

**Architecture notes**

```ts
interface CertificatesQuery {
  page: number;
  pageSize: number; // default 9
  // sort?: string;
  // filter?: string;
}
```

**Future enhancements**

- Sort by date / issuer.
- Expand card to show credential preview.

---

### Phase 7 — About overlay

**Goal:** Minimal centered about scene with glass and motion.

| Task | Status |
|------|--------|
| Copy structure: intro, role, values or stack (short) | ⬜ |
| `AboutOverlay` — centered column, glass surface optional | ⬜ |
| Entrance animation (typography stagger) | ⬜ |
| Social / contact links in footer or about panel | ⬜ |
| Optional portrait with soft mask (if asset available) | ⬜ |

**UI / motion goals**

- Restrained: fewer elements than home; emphasis on elegant type rhythm.

---

### Phase 8 — Advanced Framer Motion

**Goal:** Polish transitions, shared layout, modal detail flows.

| Task | Status |
|------|--------|
| Project detail fullscreen overlay | ⬜ |
| `layoutId` shared element: thumbnail → hero image | ⬜ |
| Modal backdrop + body scroll lock | ⬜ |
| Navbar indicator sync with programmatic section changes | ⬜ |
| Fine-tune section `direction`-aware variants | ⬜ |
| Optional: `MotionConfig` transition per section | ⬜ |

**Technical concerns**

- Shared layout requires consistent component tree; keep thumbnail and detail in same `LayoutGroup`.
- Test reduced-motion path for all shared layouts.

---

### Phase 9 — GSAP integration

**Goal:** Scroll-triggered storytelling without fighting React state.

| Task | Status |
|------|--------|
| Install `gsap` + `@gsap/react` (or `useGSAP`) | ⬜ |
| Register ScrollTrigger; cleanup on unmount | ⬜ |
| Home: optional pinned beat timeline | ⬜ |
| Coordinate GSAP progress → React beat index (one source of truth) | ⬜ |
| Document handoff boundaries in `PROGRESS.md` | ⬜ |

**Performance**

- `gsap.context()` for automatic revert on route/section unmount.
- Avoid ScrollTrigger on hidden overlays (disable when `activeSection !== 'home'`).

---

### Phase 10 — Performance, a11y & polish

**Goal:** Production-ready feel on mid-range devices.

| Task | Status |
|------|--------|
| Lighthouse pass (performance, a11y, best practices) | ⬜ |
| `prefers-reduced-motion` audit | ⬜ |
| Keyboard nav: all nav items, CTAs, pagination | ⬜ |
| Focus trap in project detail modal | ⬜ |
| Image optimization pipeline | ⬜ |
| Bundle analyze; code-split overlays | ⬜ |
| FPS spot-check during section + project transitions | ⬜ |
| Mobile: touch targets, safe areas, no scroll bleed | ⬜ |
| SEO / meta tags (minimal for SPA) | ⬜ |

---

## Cross-cutting checklist

### Accessibility

- [ ] Semantic landmarks: `header`, `main`, `footer`
- [ ] `aria-current` on active nav item
- [ ] Sufficient color contrast on glass over photography
- [ ] Skip link optional (single-page app — focus management on section change)

### Responsive

- [x] Home hero: mobile cards + scroll hint stacking; `pr-10`/`pr-12` beat indicator gutter
- [x] Home capabilities: `overflow-y-auto` on small screens; 3-col grids on lg+
- [x] Projects: `grid-cols-1` mobile; `line-clamp` title/description; `max-h-[45vh]` image on lg+
- [ ] Certificates overlay responsive QA (deferred this pass)
- [ ] Background `object-position` tuned per breakpoint

**Viewport smoke test (Home + Projects):** 320px · 390px · 768px · 1024px · 1440px — no content under navbar/footer; beat/page indicators do not cover primary copy.

### Developer experience

- [ ] ESLint clean
- [ ] Consistent `@/` imports
- [ ] Feature README snippets in overlay folders (optional, short)

---

## Decisions log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-24 | State-driven sections over routes first | Matches immersive single-app model; routes can layer on later |
| 2026-05-24 | `motion` package (not legacy `framer-motion` import path) | Already in `package.json` v12 |
| 2026-05-24 | Framer first, GSAP later | Avoid dual animation ownership during core build |
| 2026-05-24 | Certificates page size = 9 (3×3) | Per product requirements |
| 2026-05-24 | API base: `gilang-alfarizi-portfolio-be.vercel.app` | Deployed NestJS backend; paths `/project`, `/certificate` |
| 2026-05-24 | `useScrollCapture` generic hook | Shared by home beats and project carousel |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05-24 | Initial `PROGRESS.md` created from requirements + repo audit |
| 2026-05-24 | Phase 1 shell + Phase 2 nav + home landing (reference screenshot) |
| 2026-05-24 | Responsive nav + home scroll beats + Capabilities & Arsenal |
| 2026-05-24 | Live API wired; Projects overlay + Syne typography |
| 2026-05-24 | Phase 6 Certificates — image grid, scroll pagination, API v2 fields |
| 2026-05-24 | Skills API on Capabilities beat; Simple Icons tiles; computed strength; Home/Projects responsive pass; removed `tech-stack.ts` |

---

## How to maintain this file

1. **After each meaningful PR or session:** update task checkboxes, Quick status table, and Changelog.
2. **When discovering API shape mismatches:** update API contracts and affected phase tasks.
3. **When reprioritizing:** reorder phases only with reason in Decisions log.
4. **Remove** tasks that are no longer relevant; **add** sub-tasks with concrete file/component names.
5. Keep tasks **incremental** — each checkbox should be completable in one focused session where possible.
