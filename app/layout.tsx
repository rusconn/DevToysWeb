import "./_styles/globals.css";

import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";

import { siteConfig } from "./_config/site";
import { SearchTextProvider } from "./_contexts/search-text";
import { Sidebar } from "./_layout/sidebar";
import { SiteHeader } from "./_layout/site-header";
import { TailwindIndicator } from "./_layout/tailwind-indicator";
import { fontMono, fontSans } from "./_lib/fonts";
import { cn } from "./_lib/style";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  generator: "Next.js",
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
  openGraph: {
    title: siteConfig.name,
    siteName: siteConfig.name,
    type: "website",
  },
  verification: {
    google: "LlndxXYLHOwTH1LOIcckAWY3xg3y9TMfL-U__wnKAFw",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen bg-neutral-150 font-sans text-sm font-medium text-neutral-750 antialiased",
          "dark:bg-neutral-850 dark:text-neutral-200",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          <SearchTextProvider>
            <div className="grid h-full grid-cols-[18rem_1fr] grid-rows-[3.5rem_1fr]">
              <div className="col-span-full content-center">
                <SiteHeader />
              </div>
              <Sidebar />
              <main
                className={cn(
                  "overflow-y-auto rounded-tl-md border bg-neutral-100 p-12",
                  "dark:bg-neutral-800",
                )}
              >
                {children}
              </main>
            </div>
            <TailwindIndicator />
          </SearchTextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
