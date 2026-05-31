import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warranty — Forge Keyboards",
  description: "Forge TKL 3-year limited warranty. Everything covered, no questions asked.",
};

const sections = [
  {
    heading: "What's covered",
    body: "Your Forge TKL is covered against defects in materials and workmanship for three years from the date of shipment. This includes the aluminium case, PCB, hot-swap sockets, RGB system, USB-C port, and all internal components. If something fails under normal use, we fix or replace it — no questions asked.",
  },
  {
    heading: "What's not covered",
    body: "Physical damage from drops or impacts, liquid damage, modifications to the PCB or firmware that cause hardware failure, and cosmetic wear (scratches, patina) that develop through normal use. Switches are a consumable part; contact us if you believe a socket has failed rather than the switch itself.",
  },
  {
    heading: "How to claim",
    body: "Email warranty@forgekeyboards.com with your order number, a brief description of the issue, and a short video or photo if relevant. We'll respond within one business day. If the fault is covered, we'll send a prepaid return label and ship a replacement or repaired unit within 7–10 business days of receipt.",
  },
  {
    heading: "Transferability",
    body: "Warranty coverage transfers with the keyboard. If you sell your Forge TKL, the remaining warranty period transfers to the new owner. The new owner should email us with the original order number to register the transfer.",
  },
  {
    heading: "Limitation of liability",
    body: "Our liability is limited to repair or replacement of the product. We are not liable for any indirect, incidental, or consequential damages arising from product failure. Some jurisdictions do not allow these limitations — in those cases your statutory rights apply in full.",
  },
];

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Nav */}
      <nav className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="px-8 md:px-16 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-base tracking-[0.25em] text-foreground/90 uppercase"
          >
            Forge
          </Link>
          <Link
            href="/order"
            className="text-xs tracking-[0.18em] text-foreground/50 uppercase border border-foreground/20 px-5 py-2.5 hover:border-amber hover:text-foreground transition-colors duration-300"
          >
            Order — $289
          </Link>
        </div>
      </nav>

      <div className="px-8 md:px-16 py-16 md:py-24 max-w-3xl">

        {/* Header */}
        <div className="mb-16">
          <p className="text-amber text-xs tracking-[0.3em] uppercase font-body mb-4">
            Forge Keyboards
          </p>
          <h1 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.93] tracking-[-0.025em] text-foreground mb-6">
            3-year limited<br /><em>warranty.</em>
          </h1>
          <p className="font-body text-muted-light text-base leading-relaxed max-w-xl">
            We build keyboards to last. If ours doesn't, we make it right.
          </p>
        </div>

        <div className="h-px bg-border mb-16" />

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map((s, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12">
              <p className="font-body text-xs tracking-[0.2em] text-muted uppercase pt-1">
                {s.heading}
              </p>
              <p className="font-body text-base text-foreground/80 leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="h-px bg-border mt-16 mb-10" />

        {/* Footer nav */}
        <div className="flex flex-wrap gap-6">
          <Link href="/" className="text-xs tracking-[0.18em] text-muted hover:text-foreground uppercase font-body transition-colors duration-200">
            ← Home
          </Link>
          <Link href="/returns" className="text-xs tracking-[0.18em] text-muted hover:text-foreground uppercase font-body transition-colors duration-200">
            Returns policy
          </Link>
          <Link href="/order" className="text-xs tracking-[0.18em] text-amber hover:text-amber-light uppercase font-body transition-colors duration-200">
            Order now →
          </Link>
        </div>

      </div>
    </div>
  );
}
