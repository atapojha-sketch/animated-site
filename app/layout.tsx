import type { Metadata } from "next";
import { DM_Serif_Display, Lora } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Forge TKL — Precision Mechanical Keyboard",
  description:
    "CNC-machined aluminum. Hot-swap switches. Gasket-mounted plate. The Forge TKL is built for those who refuse to compromise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
