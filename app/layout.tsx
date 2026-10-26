import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config/site-config";
import { ThemeRoot } from "@/components/theme";
import { ScrollRoot } from "@/components/scroll";
import SiteHeader from "@/components/header/site-header";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import RevealObserver from "@/components/reveal-observer";

// Archivo carries everything from body text to the cover lettering; its width
// axis lets display sizes run condensed. Plex Mono is the drafting hand for
// annotations and code; Instrument Serif italic is reserved for figure captions.
const sans = Archivo({ subsets: ["latin"], variable: "--font-archivo", axes: ["wdth"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument" });

const { name, seo, links } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: { default: seo.title, template: `%s · ${name}` },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name, url: links.github }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: "/",
    siteName: name,
    title: seo.title,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0d" },
    { media: "(prefers-color-scheme: light)", color: "#f1efe8" },
  ],
};

// A saved choice wins; otherwise the OS setting decides. Applied before the first
// paint, so nobody sees a flash of the wrong theme. Without JavaScript: paper.
const restoreTheme = `try{var t=localStorage.getItem("theme");(t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches)&&document.documentElement.classList.add("dark")}catch(_){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: restoreTheme }} />
      </head>
      <body className="flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-100 focus:rounded-[2px] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-canvas"
        >
          Skip to content
        </a>
        <ThemeRoot>
          <ScrollRoot>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
              {children}
            </main>
            <Footer />
            <BackToTop />
            <RevealObserver />
          </ScrollRoot>
        </ThemeRoot>
      </body>
    </html>
  );
}
