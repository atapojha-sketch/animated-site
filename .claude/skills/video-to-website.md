# Video to Website

Teaches Claude to read a product reveal video and translate its motion arc into a scroll-driven web experience. This is the "magic" that makes the site feel custom-built around the product.

## Reading the Video

- Identify the **motion arc**: how does the product enter, reveal, and resolve? (e.g. slow zoom-in → rotation → final rest)
- Note the **pacing**: is the video fast-cut and kinetic, or slow and cinematic? Match the scroll speed and animation duration to this rhythm.
- Extract **key frames**: the moments of highest visual impact in the video become the scroll-pinned moments on the web.
- Note **light and shadow direction** — replicate this in CSS lighting effects or gradient overlays on the product image.
- Identify the **hero color story**: dominant background tone, product finish (matte/gloss/metal), accent colors in the video.

## Translating Motion to Scroll

- Map the video timeline to scroll progress (0% scroll = video start, 100% scroll = video end).
- Each major motion beat in the video becomes a scroll trigger:
  - Product enters frame → scroll-triggered fade + translate in
  - Product rotates or reveals a feature → scroll-pinned rotation or clip-path reveal
  - Text/copy appears in video → staggered text entrance on scroll
  - Final product rest position → sticky section with supporting copy alongside
- Use `ScrollTrigger` (GSAP) or CSS `animation-timeline: scroll()` for implementation.
- Pinned sections should feel like the user is "scrubbing" through the video.

## Scroll Architecture

- Structure the page as a sequence of **acts**, not sections:
  1. **Act 1 — Arrival**: Product enters. No text competing. Pure visual.
  2. **Act 2 — Reveal**: Key features surface one at a time, synced to scroll.
  3. **Act 3 — Resolution**: Product at rest, full context, CTA.
- Each act should have enough scroll distance to feel deliberate — minimum 100vh per act, often 200–300vh for pinned sequences.

## Visual Fidelity

- The product asset (image or video loop) is the hero — never shrink it below 60vw on desktop.
- Background should recede, not compete: near-black, deep neutral, or a tone pulled directly from the video.
- Text enters the scene, it does not anchor it. Copy should feel like subtitles to the product's motion.
- If the video has a sound design feel (e.g. a "thud" on product landing), translate that into a micro-animation: a subtle scale pulse, a shadow drop, a brief blur-to-sharp transition.

## What to avoid

- Splitting the product visual into a card or thumbnail — it must stay full-bleed or near-full.
- Animating too many elements at once — the product is always the subject; everything else is supporting cast.
- Generic section transitions (fade-in on scroll) that ignore the video's specific motion language.
- Losing the video's color grading in the web translation — extract and apply it.
