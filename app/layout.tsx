import "./_styles/reset.css";
import "./_styles/globals.css";

import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";

import { siteConfig } from "./_config/site";
import { SearchTextProvider } from "./_contexts/search-text";
import { Sidebar } from "./_layout/sidebar";
import { SiteHeader } from "./_layout/site-header";
import { fontMono, fontSans } from "./_lib/fonts";
import { cn } from "./_lib/style";

import styles from "./layout.module.css";

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
      <body className={cn(styles.body, fontSans.variable, fontMono.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          <SearchTextProvider>
            <div className={styles.container}>
              <div className={styles["header-container"]}>
                <SiteHeader />
              </div>
              <Sidebar />
              <main className={styles.main}>{children}</main>
            </div>
          </SearchTextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
