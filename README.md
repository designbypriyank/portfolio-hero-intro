# portfolio-hero-intro

Scroll-scrubbed intro for Priyank's portfolio: *"It's not the view. It's how you frame it."*
A hand-drawn opening keeps re-framing a desert view, then the view takes over and the page lands on the portfolio home.

- Next.js 15 · TypeScript · Tailwind v4 · shadcn structure (`components/ui`)
- `components/ui/hero-scrub.tsx` — GSAP ScrollTrigger canvas frame scrubber
- `components/home-landing.tsx` — tone bridge + home page reveal
- `scripts/gen-frames.mjs` — renders the frame sequence to `public/frames` (edit `SHAPES` and run `node scripts/gen-frames.mjs`)

```bash
npm install && npm run dev
```
