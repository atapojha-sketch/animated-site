import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns — Forge Keyboards",
  description: "30-day no-hassle returns on all Forge TKL orders.",
};

const sections = [
  {
    heading: "30-day returns",
    body: "If you're not satisfied with your Forge TKL for any reason, return it within 30 days of delivery for a full refund — no restocking fee, no questions required. The keyboard must be in its original condition with all included accessories (USB-C cable, carrying case, extra keycap puller).",
  },
  {
    heading: "How to start a return",
    body: "Email returns@forgekeyboards.com with your order number and we'll send a prepaid return shipping label within one business day. Pack the keyboard securely in its original packaging if possible. Once we receive and inspect the unit (typically 2–3 business days), your refund is processed to the original payment method.",
  },
  {
    heading: "Refund timeline",
    body: "Refunds are issued within 2 business days of inspection completion. Depending on your bank or card provider, the credit may take an additional 3–5 business days to appear on your statement. We'll email you when the refund is processed.",
  },
  {
    heading: "Exchanges",
    body: "Want a different switch type or colorway? We treat this as a return + new order. Start a return on your original order and place a new order for the configuration you want. If your new order ships before your return arrives, we'll hold the refund until the original unit is received.",
  },
  {
    heading: "Damaged in transit",
    body: "If your keyboard arrives damaged, email us within 48 hours of delivery with photos of the packaging and damage. We'll ship a replacement immediately at no cost and arrange collection of the damaged unit. You do not need to wait for the collection before your replacement ships.",
  },
  {
    heading: "Pre-orders",
    body: "Pre-order deposits are fully refundable at any time before your unit ships. After shipping, standard 30-day return terms apply.",
  },
];

export default function ReturnsPage() {
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
            className="text-xs tracking-[0.18em] text-foreground/50 uppercase border border-foreground/20 px-5 py-2.5 hover:border-emerald hover:text-foreground transition-colors duration-300"
          >
            Order — $289
          </Link>
        </div>
      </nav>

      <div className="px-8 md:px-16 py-16 md:py-24 max-w-3xl">

        {/* Header */}
        <div className="mb-16">
          <p className="text-emerald text-xs tracking-[0.3em] uppercase font-body mb-4">
            Forge Keyboards
          </p>
          <h1 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.93] tracking-[-0.025em] text-foreground mb-6">
            30-day<br /><em>returns.</em>
          </h1>
          <p className="font-body text-muted-light text-base leading-relaxed max-w-xl">
            Try it on your desk. If it's not right, send it back. Free, fast, no fuss.
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
          <Link href="/warranty" className="text-xs tracking-[0.18em] text-muted hover:text-foreground uppercase font-body transition-colors duration-200">
            Warranty
          </Link>
          <Link href="/order" className="text-xs tracking-[0.18em] text-emerald hover:text-emerald-light uppercase font-body transition-colors duration-200">
            Order now →
          </Link>
        </div>

      </div>
    </div>
  );
}
