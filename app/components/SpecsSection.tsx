"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
}

function AnimatedCounter({ value, suffix = "", decimals = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  );
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, value, {
      duration: 1.2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, motionVal, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const counters = [
  { value: 87, suffix: "", label: "Keys", sub: "Tenkeyless layout" },
  { value: 1000, suffix: "Hz", label: "Poll Rate", sub: "1ms response time" },
  { value: 1.5, suffix: "mm", label: "Actuation", sub: "Linear & tactile options", decimals: 1 },
  { value: 38, suffix: "dB", label: "Sound floor", sub: "With foam dampening" },
];

const specs = [
  { label: "Layout", value: "87-key TKL (ANSI)" },
  { label: "Case", value: "CNC 6061 aluminium" },
  { label: "Mount", value: "Gasket — Shore 40A silicone" },
  { label: "PCB", value: "1.2mm FR4, hot-swap, 5-pin" },
  { label: "Plate", value: "1.5mm aluminium" },
  { label: "Switch", value: "MX-compatible, buyer's choice" },
  { label: "Connection", value: "USB-C, detachable" },
  { label: "Weight", value: "1.42 kg assembled" },
  { label: "Dimensions", value: "357 × 130 × 38mm" },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function SpecsSection() {
  return (
    <section className="relative bg-surface py-24 md:py-40">
      <div className="px-8 md:px-16">
        {/* Section header */}
        <div className="h-px bg-border mb-16 md:mb-20" />

        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="text-amber text-xs tracking-[0.3em] uppercase font-body mb-4"
          >
            Specifications
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.08 }}
            className="font-display text-[clamp(32px,5vw,60px)] leading-[0.95] tracking-[-0.02em] text-foreground"
          >
            Built to spec,
            <br />
            built to last.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Counter grid */}
          <div className="grid grid-cols-2 gap-px bg-border">
            {counters.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 24, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, ease: easeOut, delay: i * 0.1 }}
                className="bg-surface p-8 flex flex-col gap-2"
              >
                <div className="font-display text-4xl md:text-5xl text-foreground tracking-[-0.02em]">
                  <AnimatedCounter
                    value={c.value}
                    suffix={c.suffix}
                    decimals={c.decimals ?? 0}
                  />
                </div>
                <p className="text-foreground/80 font-body text-sm tracking-wide">
                  {c.label}
                </p>
                <p className="text-muted font-body text-xs leading-relaxed">
                  {c.sub}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Spec table */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-[11px] tracking-[0.25em] text-muted uppercase font-body mb-6">
              Full specifications
            </p>
            <div className="flex flex-col divide-y divide-border">
              {specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, ease: easeOut, delay: 0.3 + i * 0.05 }}
                  className="flex items-baseline justify-between py-4 gap-4"
                >
                  <span className="text-muted font-body text-xs tracking-[0.1em] uppercase shrink-0">
                    {s.label}
                  </span>
                  <span className="text-foreground/80 font-body text-sm text-right leading-relaxed">
                    {s.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
