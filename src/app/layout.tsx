import type { Metadata } from "next";
import { Lato, Montserrat, Poppins } from "next/font/google";

import { Providers } from "@/components/providers/providers";
import { siteConfig } from "@/config/site";

import "./globals.css";

/**
 * Confirmed brand typefaces — docs/02-brand-guidelines.md Section 8 /
 * docs/03-design-system.md Section 2. Weights match the ranges actually
 * observed in use on the live site (Montserrat 600–700 for headings,
 * Poppins 400–500 for buttons); Lato 400/700 covers body copy and
 * emphasis.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-button",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
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
      className={`${montserrat.variable} ${poppins.variable} ${lato.variable}`}
    >
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
