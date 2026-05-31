"use client";

import { motion } from "motion/react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function CTASection() {
  return (
    <section id="cta" className="relative bg-surface overflow-hidden">
      {/* Amber accent line at top */}
      <div className="h-px bg-amber/30" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-[0.1]"
          style={{
            background: "radial-gradient(ellipse, #d4880c 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative px-8 md:px-16 py-24 md:py-40">
        {/* Pre-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-amber text-xs tracking-[0.3em] uppercase font-body mb-6"
        >
          Limited first run — 500 units
        </motion.p>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.08 }}
          className="font-display text-[clamp(40px,8vw,96px)] leading-[0.9] tracking-[-0.03em] text-foreground max-w-4xl"
        >
          The keyboard
          <br />
          you&rsquo;ll never
          <br />
          <em>want to leave.</em>
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
          className="mt-8 text-muted-light font-body text-base md:text-lg max-w-sm leading-relaxed"
        >
          Ships fully assembled and tested. 3-year warranty. Free worldwide
          shipping on orders over $150.
        </motion.p>

        {/* Price + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6"
        >
          <div>
            <p className="text-[11px] tracking-[0.25em] text-muted uppercase font-body mb-1">
              Starting at
            </p>
            <p className="font-display text-5xl md:text-6xl text-foreground tracking-[-0.02em]">
              $289
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:ml-8">
            <motion.a
              href="/order"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center justify-center gap-3 bg-amber hover:bg-amber-light text-background text-sm tracking-[0.15em] uppercase font-body px-10 py-5 transition-colors duration-300 group"
            >
              Order Now
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
            <p className="text-xs text-muted font-body text-center sm:text-left">
              Estimated shipping Q3 2025
            </p>
          </div>
        </motion.div>

        {/* Bottom rule + footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOut, delay: 0.5 }}
          className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <span className="font-display text-sm tracking-[0.3em] text-foreground/30 uppercase">
            Forge
          </span>
          <p className="text-[11px] tracking-[0.15em] text-muted font-body">
            © 2025 Forge Keyboards. Designed and assembled in-house.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Warranty", href: "/warranty" },
              { label: "Returns",  href: "/returns"  },
              { label: "Contact",  href: "mailto:hello@forgekeyboards.com" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="link-underline text-[11px] tracking-[0.18em] text-muted hover:text-foreground/60 uppercase font-body transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
