"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scrub video currentTime with scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration;
    if (!dur || !isFinite(dur)) return;
    video.currentTime = latest * dur;
  });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.25], [0, -48]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [1, 0]
  );

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          src="/reveal.mp4.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark vignette — stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50 pointer-events-none" />

        {/* Left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent pointer-events-none" />

        {/* Nav */}
        <motion.nav
          style={{ opacity: navOpacity }}
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-7"
        >
          <span className="font-display text-base tracking-[0.25em] text-foreground/90 uppercase">
            Forge
          </span>
          <a
            href="#cta"
            className="text-xs tracking-[0.18em] text-foreground/50 uppercase border border-foreground/20 px-5 py-2.5 hover:border-amber hover:text-foreground transition-colors duration-300"
          >
            Order — $289
          </a>
        </motion.nav>

        {/* Hero copy */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="absolute bottom-16 left-0 right-0 px-8 md:px-16"
        >
          <p className="text-amber text-xs tracking-[0.3em] uppercase mb-5 font-body">
            Forge TKL — 2025
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[88px] leading-[0.93] tracking-[-0.025em] text-foreground max-w-2xl">
            Every keystroke,
            <br />
            <em>engineered.</em>
          </h1>
          <p className="mt-7 text-muted-light font-body text-base md:text-lg max-w-sm leading-relaxed">
            CNC-machined aluminum. Hot-swap switches.
            <br />
            Built for those who refuse to compromise.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <a
              href="#cta"
              className="inline-block bg-amber text-background text-xs tracking-[0.2em] uppercase px-8 py-4 font-body hover:bg-amber-light transition-colors duration-300"
            >
              Order Now
            </a>
            <a
              href="#features"
              className="text-xs tracking-[0.2em] text-muted-light uppercase hover:text-foreground transition-colors duration-300"
            >
              Explore
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-3"
        >
          <div className="w-px h-12 bg-foreground/20 relative overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-amber"
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
