# Design System

## Typography

- **Never** use Inter as a default font. Prefer editorial typefaces: serif for headings (e.g. Playfair Display, DM Serif Display, Cormorant Garamond), mono or grotesque for UI labels.
- Type hierarchy must be intentional: large display text should feel oversized and deliberate, not just "bigger".
- Line-height for display text: 0.9–1.1. Body: 1.5–1.65.
- Letter-spacing: tight on headings (-0.02em to -0.04em), normal on body.

## Color & Contrast

- **No purple gradients.** No blue-purple or violet default palettes.
- Default to high-contrast monochromatic or two-tone palettes: off-white/cream on near-black, or vice versa.
- Accent colors should be warm (amber, sand, rust, sage) or editorial neutrals.
- Reserve color for emphasis — not decoration.

## Spacing Rhythm

- Use a consistent 8px base grid. Spacing values: 4, 8, 16, 24, 32, 48, 64, 96, 128px.
- Section padding should feel generous: minimum 96px vertical on desktop.
- Avoid cramped layouts. White space is structure, not waste.

## Fold Structure

- The first fold (above the fold) must establish hierarchy immediately: one dominant element, one supporting element, nothing competing.
- Hero sections: full-viewport or near-full. No small, centered card-style heroes unless explicitly editorial.
- Navigation should be minimal and not compete with content.

## Animations

- Motion should feel physical: use ease-out or custom cubic beziers, never linear or ease-in-out defaults.
- Entrance animations: fade + translate (y: 20–40px), duration 0.5–0.8s.
- No bouncy spring animations unless the product tone calls for playfulness.
- Stagger delays between elements: 0.08–0.15s per item.
- Performance: prefer `transform` and `opacity` only. Never animate `height`, `width`, or `margin`.

## Component Defaults

- Buttons: understated by default — outlined or text-only. Filled buttons are a strong action, use sparingly.
- Cards: no rounded corners beyond 4px unless the design language explicitly calls for it. No box shadows by default — use border or background contrast instead.
- Images: always consider aspect ratio locking. No distorted images.

## What to avoid

- Purple, violet, or blue-purple gradients
- Inter, Roboto, or system-ui as a heading font
- Centered layouts for everything (left-align editorial content)
- Rounded pill buttons as a default
- Drop shadows on everything
- Glassmorphism unless the visual context demands it
