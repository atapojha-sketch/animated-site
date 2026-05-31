"use client";

import { motion } from "motion/react";

const reviews = [
  {
    quote:
      "The typing feel is unlike anything I've used. The gasket mount absorbs every keystroke without losing feedback — it's a sound you feel before you hear.",
    author: "Marcus Lim",
    handle: "@mechkeys_m",
    publication: "The Keyboard Review",
    rating: 5,
  },
  {
    quote:
      "In a crowded market, Forge TKL stands apart. CNC tolerances this precise belong on an instrument, not a desk. But I'm glad it's on mine.",
    author: "Nadia Forrest",
    handle: "@nadiaf_tech",
    publication: "Input Magazine",
    rating: 5,
  },
  {
    quote:
      "Hot-swap that clicks in properly. RGB that doesn't look tacky. Build quality that makes twice-the-price boards look cheap. I've reviewed 60+ keyboards.",
    author: "Sam Okeke",
    handle: "@typewellsam",
    publication: "TechHive",
    rating: 5,
  },
  {
    quote:
      "Three months in. Still reach for it every morning. That alone tells you everything.",
    author: "r/MechanicalKeyboards",
    handle: "u/alps_typist",
    publication: "Community",
    rating: 5,
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function SocialProofSection() {
  return (
    <section className="relative bg-canvas py-16 md:py-28 overflow-hidden">
      <div className="px-8 md:px-16">
        <div className="h-px bg-canvas-rule mb-12 md:mb-16" />

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <p className="text-emerald text-xs tracking-[0.3em] uppercase font-body mb-4">
              Press & Community
            </p>
            <h2 className="font-display text-[clamp(40px,5.5vw,68px)] leading-[0.95] tracking-[-0.02em] text-ink">
              Heard the
              <br />
              <em>difference.</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.9l-3.09 1.61.59-3.44L2 4.635l3.455-.505L7 1z"
                  fill="#00d98e"
                />
              </svg>
            ))}
            <span className="text-ink-muted font-body text-xs ml-2">
              4.9 avg — 340 verified reviews
            </span>
          </motion.div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-canvas-rule">
          {reviews.map((r, i) => (
            <motion.div
              key={r.handle}
              initial={{ opacity: 0, y: 32, filter: "blur(2px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.1 }}
              className="bg-canvas p-8 md:p-10 flex flex-col justify-between gap-8"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(r.rating)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.9l-3.09 1.61.59-3.44L2 4.635l3.455-.505L7 1z"
                      fill="#00d98e"
                    />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-lg md:text-xl leading-relaxed text-ink/80 flex-1">
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-body text-sm text-ink/70">{r.author}</p>
                  <p className="font-body text-xs text-ink-muted mt-0.5">{r.handle}</p>
                </div>
                <span className="text-xs tracking-[0.2em] text-emerald/80 uppercase font-body">
                  {r.publication}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
