"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven transforms
  const copyOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.25], [0, -48]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  // Parallax: video drifts 20px down; top: -20px buffer prevents gap at top
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  // 3D tilt: normalized mouse position (−0.5 to 0.5) → ±6° rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateXRaw = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateYRaw = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 300, damping: 40 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 300, damping: 40 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div
        className="sticky top-0 h-screen overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Perspective scoped to video only — avoids promoting every child to 3D compositing layer */}
        <div className="absolute inset-0" style={{ perspective: "1200px" }}>
          {/* Video — top: -20px gives 20px headroom so parallax never shows a gap */}
          <motion.video
            ref={videoRef}
            src="reveal-scrub2.mp4"
            muted
            autoPlay
            playsInline
            preload="auto"
            aria-label="Forge TKL mechanical keyboard exploded assembly view"
            style={{ rotateX, rotateY, top: "-20px", height: "calc(100% + 20px)", willChange: "transform" }}
            className="absolute left-0 right-0 w-full object-cover"
          />
        </div>

        {/* Dark vignette — stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50 pointer-events-none" />

        {/* Left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent pointer-events-none" />

        {/* Nav */}
        <motion.nav
          style={{ opacity: navOpacity }}
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-7"
        >
          <span className="forge-logo font-display text-2xl md:text-3xl font-bold tracking-[0.25em] text-foreground uppercase">
            Forge
          </span>
          <a
            href="/order"
            className="pulsate-button text-xs tracking-[0.18em] text-background uppercase bg-emerald px-5 py-2.5 transition-all duration-300 font-body font-bold"
          >
            Order — $289
          </a>
        </motion.nav>

        {/* Hero copy
            Outer div: positioning.
            Scroll-exit wrapper (motion.div): drives opacity + y as user scrolls.
            Inner elements: independent staggered entrance — no conflict because
            the wrapper starts at opacity=1 / y=0 when scrollYProgress=0. */}
        <div className="absolute bottom-16 left-0 right-0 px-8 md:px-16">
          <motion.div style={{ opacity: copyOpacity, y: copyY }}>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0 }}
              className="text-emerald text-xs tracking-[0.3em] uppercase mb-5 font-body"
            >
              Forge TKL — 2026
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="font-display text-[clamp(40px,7.5vw,88px)] leading-[0.93] tracking-[-0.025em] text-foreground max-w-2xl"
            >
              Every keystroke,
              <br />
              <em>engineered.</em>
            </motion.h1>

            {/* Subheadline — 0.15s stagger after headline (0.1 + 0.15 = 0.25) */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
              className="mt-7 text-muted-light font-body text-base md:text-lg max-w-sm leading-relaxed"
            >
              CNC-machined aluminum. Hot-swap switches.
              <br />
              Built for those who refuse to compromise.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.38 }}
              className="mt-8 flex items-center gap-6"
            >
              <motion.a
                href="/order"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block bg-emerald text-background text-xs tracking-[0.2em] uppercase px-8 py-4 font-body hover:bg-emerald-light transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,217,142,0.5)]"
              >
                Order Now
              </motion.a>
              <a
                href="#features"
                className="link-underline text-xs tracking-[0.2em] text-muted-light uppercase hover:text-foreground transition-colors duration-300"
              >
                Explore
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-3"
        >
          <div className="w-px h-12 bg-foreground/20 relative overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-emerald shadow-[0_0_10px_rgba(0,217,142,0.8)]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[10px] tracking-[0.25em] text-foreground/30 uppercase rotate-90 origin-center mt-1">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
