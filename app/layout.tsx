import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config/site-config";
import { ThemeRoot } from "@/components/theme";
import { ScrollRoot } from "@/components/scroll";
import SiteHeader from "@/components/header/site-header";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";

const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

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
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// Dark is the default. A saved "light" choice is applied before the first paint,
// so returning visitors never see a flash of the wrong theme.
const restoreTheme = `try{localStorage.getItem("theme")==="light"&&document.documentElement.classList.remove("dark")}catch(_){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: restoreTheme }} />
      </head>
      <body className="flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-100 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-canvas"
        >
          Skip to content
        </a>
        <ThemeRoot>
          <ScrollRoot>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </ScrollRoot>
        </ThemeRoot>
      </body>
    </html>
  );
}
