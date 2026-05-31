"use client";

import { motion } from "motion/react";

const features = [
  {
    index: "01",
    title: "Hot-Swap\nSwitches",
    description:
      "Swap stems in seconds. No soldering iron, no downtime — just pull, replace, and type. Compatible with all MX-footprint switches.",
    detail: "5-pin PCB compatible",
  },
  {
    index: "02",
    title: "Gasket-Mount\nPlate",
    description:
      "A layer of Shore 40A silicone sits between plate and PCB, absorbing the shock of each keystroke. The result: a sound signature you feel as much as hear.",
    detail: "South-facing LED cutouts",
  },
  {
    index: "03",
    title: "Per-Key\nRGB",
    description:
      "16.8 million colours, individually addressable. Tuned with the case finish in mind — warm amber presets ship by default.",
    detail: "SMD RGB with diffusion layer",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function FeaturesSection() {
  return (
    <section id="features" className="relative bg-canvas py-24 md:py-40">
      {/* Top rule */}
      <div className="px-8 md:px-16">
        <div className="h-px bg-canvas-rule" />
      </div>

      {/* Section header */}
      <div className="px-8 md:px-16 mt-16 md:mt-20 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <p className="text-amber text-xs tracking-[0.3em] uppercase font-body mb-4">
            Engineering
          </p>
          <h2 className="font-display text-[clamp(40px,5.5vw,68px)] leading-[0.95] tracking-[-0.02em] text-ink max-w-md">
            Precision at
            <br />
            every layer.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
          className="text-ink-muted font-body text-base leading-relaxed max-w-xs"
        >
          Three systems working in concert. Each one independently exceptional, each
          one made to complement the others.
        </motion.p>
      </div>

      {/* Feature grid — gap-px + bg-canvas-rule creates 1px dividers */}
      <div className="px-8 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-canvas-rule">
        {features.map((f, i) => (
          <motion.div
            key={f.index}
            initial={{ opacity: 0, y: 40, filter: "blur(2px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: easeOut, delay: i * 0.1 }}
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-canvas p-8 md:p-10 flex flex-col gap-6 group h-full hover:shadow-[0_20px_40px_-8px_rgba(212,136,12,0.18)] transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <span className="text-amber text-xs tracking-[0.25em] font-body">
                  {f.index}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber/40 group-hover:bg-amber transition-colors duration-500" />
              </div>

              <h3 className="font-display text-2xl md:text-3xl leading-[1.05] tracking-[-0.01em] text-ink whitespace-pre-line">
                {f.title}
              </h3>

              <p className="text-ink-muted font-body text-base leading-relaxed flex-1">
                {f.description}
              </p>

              <div className="pt-4 border-t border-canvas-rule">
                <span className="text-xs tracking-[0.2em] text-amber/70 uppercase font-body">
                  {f.detail}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
        className="px-8 md:px-16 mt-12 flex items-center gap-4"
      >
        <div className="w-6 h-px bg-canvas-rule" />
        <p className="text-xs tracking-[0.2em] text-ink-muted uppercase font-body">
          Six discrete layers. One unified experience.
        </p>
      </motion.div>
    </section>
  );
}
