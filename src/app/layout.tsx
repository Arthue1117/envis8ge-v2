import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { PageTransition } from "@/components/motion/page-transition";
import { Providers } from "@/components/providers/providers";
import { siteConfig } from "@/config/site";

import "./globals.css";

/**
 * Sitewide typeface — Montserrat only, per explicit request to use a
 * single consistent font across every page/component instead of the
 * earlier three-typeface system (Montserrat headings / Poppins buttons /
 * Lato body, sourced from docs/02-brand-guidelines.md Section 8 /
 * docs/03-design-system.md Section 2 — now superseded by this change).
 * One `next/font/google` load, self-hosted and subset at build time, so
 * there's no extra runtime request and nothing else to configure for
 * Vercel. Weights loaded (400/500/600/700) are exactly the set already
 * used sitewide via Tailwind's `font-normal/medium/semibold/bold`
 * utilities — no unused weights are downloaded.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={montserrat.variable}
    >
      <body className="min-h-full antialiased">
        <Providers>
          <Header />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
