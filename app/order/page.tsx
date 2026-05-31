"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const SWITCHES = [
  { id: "linear",  name: "Linear",  detail: "Smooth, silent travel",     spec: "45g actuation" },
  { id: "tactile", name: "Tactile", detail: "Tactile bump, no click",     spec: "52g actuation" },
  { id: "clicky",  name: "Clicky",  detail: "Audible click + bump",       spec: "60g actuation" },
] as const;

const COLORS = [
  { id: "charcoal", name: "Charcoal",       hex: "#2b2924" },
  { id: "midnight", name: "Midnight",       hex: "#1e2130" },
  { id: "raw",      name: "Raw Aluminium",  hex: "#8c8880" },
] as const;

const ADDONS = [
  { id: "foam",  name: "PCB foam dampening kit",  detail: "Reduces cavity resonance",       price: 18 },
  { id: "lube",  name: "Switch lube kit",         detail: "Krytox 205g0 + applicator brush", price: 24 },
  { id: "cable", name: "Coiled USB-C cable",      detail: "1.8m, amber + black colourway",   price: 32 },
] as const;

type SwitchId = typeof SWITCHES[number]["id"];
type ColorId  = typeof COLORS[number]["id"];
type AddonId  = typeof ADDONS[number]["id"];
type Step     = "config" | "details" | "confirmed";

const BASE = 289;

export default function OrderPage() {
  const [switchId, setSwitchId]   = useState<SwitchId>("linear");
  const [colorId, setColorId]     = useState<ColorId>("charcoal");
  const [addons, setAddons]       = useState<AddonId[]>([]);
  const [step, setStep]           = useState<Step>("config");
  const [form, setForm]           = useState({ name: "", email: "", address: "" });

  const toggleAddon = (id: AddonId) =>
    setAddons(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const addonTotal = ADDONS.filter(a => addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const total      = BASE + addonTotal;
  const colorHex   = COLORS.find(c => c.id === colorId)!.hex;

  const fields: Array<{ id: keyof typeof form; label: string; type: string }> = [
    { id: "name",    label: "Full name",         type: "text"  },
    { id: "email",   label: "Email address",     type: "email" },
    { id: "address", label: "Shipping address",  type: "text"  },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="px-8 md:px-16 py-5 flex items-center justify-between">
          <Link href="/" className="link-underline font-display text-base tracking-[0.25em] text-foreground/90 uppercase">
            Forge
          </Link>
          <span className="text-xs tracking-[0.2em] text-muted font-body uppercase">
            Limited first run — 500 units
          </span>
        </div>
      </nav>

      <div className="px-8 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 max-w-6xl mx-auto">

          {/* ── Left: configurator ── */}
          <div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-12"
            >
              <p className="text-emerald text-xs tracking-[0.3em] uppercase font-body mb-3">
                Configure your Forge TKL
              </p>
              <h1 className="font-display text-[clamp(32px,4vw,56px)] leading-[0.95] tracking-[-0.02em]">
                Build yours.
              </h1>
            </motion.div>

            {/* Color preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="relative mb-12 aspect-[16/7] overflow-hidden bg-surface"
            >
              <motion.div
                key={colorId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 65% 50%, ${colorHex}cc 0%, #0e0d0b 75%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center select-none">
                <span className="font-display text-5xl md:text-7xl text-foreground/[0.06] tracking-[0.4em] uppercase">
                  Forge TKL
                </span>
              </div>
              <div className="absolute bottom-4 right-5">
                <span className="text-[10px] tracking-[0.2em] text-muted/50 uppercase font-body">
                  {COLORS.find(c => c.id === colorId)!.name} colorway
                </span>
              </div>
            </motion.div>

            {/* Switch selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="mb-10"
            >
              <p className="text-[11px] tracking-[0.25em] text-muted uppercase font-body mb-4">
                Switch type
              </p>
              <div className="grid grid-cols-3 gap-px bg-border">
                {SWITCHES.map(sw => (
                  <button
                    key={sw.id}
                    onClick={() => setSwitchId(sw.id)}
                    className={`relative p-5 text-left transition-colors duration-200 ${
                      switchId === sw.id
                        ? "bg-surface-raised"
                        : "bg-surface hover:bg-surface-raised/60"
                    }`}
                  >
                    {switchId === sw.id && (
                      <motion.div
                        layoutId="switch-dot"
                        className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-emerald shadow-[0_0_8px_rgba(0,217,142,0.8)]"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <p className="font-body text-sm text-foreground mb-1">{sw.name}</p>
                    <p className="font-body text-xs text-muted leading-snug">{sw.detail}</p>
                    <p className="font-body text-[10px] text-emerald/60 mt-2.5 tracking-[0.15em]">
                      {sw.spec}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Color selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="mb-10"
            >
              <p className="text-[11px] tracking-[0.25em] text-muted uppercase font-body mb-4">
                Case finish
              </p>
              <div className="flex flex-wrap gap-3">
                {COLORS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setColorId(c.id)}
                    className="flex items-center gap-3 px-4 py-3 border transition-colors duration-200"
                    style={{
                      borderColor: colorId === c.id ? "#00d98e" : "#272319",
                      background:  colorId === c.id ? "#1f1d18" : "transparent",
                    }}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-white/10 shrink-0"
                      style={{ background: c.hex }}
                    />
                    <span className="font-body text-xs text-foreground/70 tracking-[0.1em]">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Add-ons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            >
              <p className="text-[11px] tracking-[0.25em] text-muted uppercase font-body mb-4">
                Add-ons{" "}
                <span className="text-muted/40 normal-case tracking-normal font-body">
                  — optional
                </span>
              </p>
              <div className="flex flex-col gap-px bg-border">
                {ADDONS.map(addon => {
                  const active = addons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${
                        active ? "bg-surface-raised" : "bg-surface hover:bg-surface-raised/40"
                      }`}
                    >
                      <div>
                        <p className="font-body text-sm text-foreground/90">{addon.name}</p>
                        <p className="font-body text-xs text-muted mt-0.5">{addon.detail}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 ml-6">
                        <span className="font-body text-sm text-foreground/60">+${addon.price}</span>
                        <motion.div
                          animate={{ backgroundColor: active ? "#00d98e" : "transparent", borderColor: active ? "#00d98e" : "#272319" }}
                          transition={{ duration: 0.15 }}
                          className="w-4 h-4 border flex items-center justify-center shrink-0"
                        >
                          <AnimatePresence>
                            {active && (
                              <motion.svg
                                key="check"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                width="10" height="8" viewBox="0 0 10 8" fill="none"
                              >
                                <path d="M1 4l3 3 5-6" stroke="#0a0a0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ── Right: summary + checkout ── */}
          <div className="lg:sticky lg:top-28 self-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="bg-surface border border-border p-8"
            >
              <AnimatePresence mode="wait">

                {step !== "confirmed" ? (

                  <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>

                    {/* Summary rows */}
                    <p className="text-[11px] tracking-[0.25em] text-muted uppercase font-body mb-6">
                      Order summary
                    </p>

                    <div className="flex flex-col gap-3 mb-6">
                      <div className="flex justify-between items-baseline">
                        <span className="font-body text-sm text-foreground/80">Forge TKL</span>
                        <span className="font-body text-sm text-foreground">${BASE}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-body text-xs text-muted">
                          {SWITCHES.find(s => s.id === switchId)!.name} switches
                        </span>
                        <span className="font-body text-xs text-muted">Included</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-body text-xs text-muted">
                          {COLORS.find(c => c.id === colorId)!.name} finish
                        </span>
                        <span className="font-body text-xs text-muted">Included</span>
                      </div>

                      <AnimatePresence initial={false}>
                        {ADDONS.filter(a => addons.includes(a.id)).map(a => (
                          <motion.div
                            key={a.id}
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="flex justify-between items-baseline overflow-hidden"
                          >
                            <span className="font-body text-xs text-muted">{a.name}</span>
                            <span className="font-body text-xs text-foreground/60">+${a.price}</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <div className="flex justify-between items-baseline">
                        <span className="font-body text-xs text-muted">Shipping</span>
                        <span className="font-body text-xs text-emerald">Free</span>
                      </div>
                    </div>

                    <div className="h-px bg-border mb-6" />

                    <div className="flex justify-between items-baseline mb-8">
                      <span className="font-body text-xs tracking-[0.2em] text-muted uppercase">Total</span>
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={total}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={{ duration: 0.2, ease: EASE }}
                          className="font-display text-4xl text-foreground"
                        >
                          ${total}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    {/* Step: config → details */}
                    <AnimatePresence mode="wait">
                      {step === "config" ? (

                        <motion.div key="continue-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            onClick={() => setStep("details")}
                            className="w-full bg-emerald hover:bg-emerald-light text-background text-xs tracking-[0.2em] uppercase font-body py-4 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,217,142,0.5)]"
                          >
                            Continue to details →
                          </motion.button>
                          <p className="text-[10px] text-muted font-body text-center mt-4 leading-relaxed">
                            No payment taken today · Estimated dispatch Q4 2026
                          </p>
                        </motion.div>

                      ) : (

                        <motion.form
                          key="details-form"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          onSubmit={e => { e.preventDefault(); setStep("confirmed"); }}
                          className="flex flex-col gap-4"
                        >
                          {fields.map(f => (
                            <div key={f.id}>
                              <label className="block text-[10px] tracking-[0.2em] text-muted uppercase font-body mb-1.5">
                                {f.label}
                              </label>
                              <input
                                type={f.type}
                                required
                                value={form[f.id]}
                                onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                                placeholder={f.label}
                                className="w-full bg-background border border-border px-4 py-3 text-sm font-body text-foreground placeholder-muted/30 focus:outline-none focus:border-emerald focus:shadow-[0_0_10px_rgba(0,217,142,0.3)] transition-all duration-200"
                              />
                            </div>
                          ))}

                          <div className="flex gap-3 mt-2">
                            <button
                              type="button"
                              onClick={() => setStep("config")}
                              className="px-5 py-4 border border-border text-xs tracking-[0.15em] text-muted uppercase font-body hover:border-foreground/30 transition-colors duration-200"
                            >
                              ← Back
                            </button>
                            <motion.button
                              type="submit"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                              className="flex-1 bg-emerald hover:bg-emerald-light text-background text-xs tracking-[0.2em] uppercase font-body py-4 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,217,142,0.5)]"
                            >
                              Place order — ${total}
                            </motion.button>
                          </div>

                          <p className="text-[10px] text-muted font-body text-center leading-relaxed mt-1">
                            3-year warranty · Free worldwide returns
                          </p>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </motion.div>

                ) : (

                  /* ── Success state ── */
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
                      className="w-14 h-14 rounded-full bg-emerald/10 border border-emerald/30 flex items-center justify-center mx-auto mb-7 shadow-[0_0_20px_rgba(0,217,142,0.2)]"
                    >
                      <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                        <path d="M1 8l6 6L19 1" stroke="#00d98e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
                    >
                      <h2 className="font-display text-2xl text-foreground mb-3">
                        Order received.
                      </h2>
                      <p className="font-body text-sm text-muted leading-relaxed mb-2">
                        Confirmation sent to
                      </p>
                      <p className="font-body text-sm text-foreground/80 mb-7 break-all">
                        {form.email}
                      </p>
                      <div className="h-px bg-border mb-7" />
                      <div className="flex flex-col gap-2 text-left mb-8">
                        <div className="flex justify-between">
                          <span className="font-body text-xs text-muted">Configuration</span>
                          <span className="font-body text-xs text-foreground/70">
                            {SWITCHES.find(s => s.id === switchId)!.name} · {COLORS.find(c => c.id === colorId)!.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-xs text-muted">Total paid</span>
                          <span className="font-body text-xs text-foreground/70">${total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-body text-xs text-muted">Est. dispatch</span>
                          <span className="font-body text-xs text-emerald">Q4 2026</span>
                        </div>
                      </div>
                      <Link
                        href="/"
                        className="link-underline text-xs tracking-[0.2em] text-muted hover:text-foreground uppercase font-body transition-colors duration-200"
                      >
                        ← Back to home
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
