import "@/styles/globals.css";

import { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/style";
import { Sidebar } from "@/components/sidebar";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { SearchTextProvider } from "@/contexts/search-text";

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
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen bg-background font-sans text-sm font-medium text-foreground antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          <SearchTextProvider>
            <div className="grid h-full grid-cols-[18rem_1fr] grid-rows-[3.5rem_1fr]">
              <SiteHeader className="col-span-full" />
              <Sidebar />
              <main className="overflow-y-auto rounded-tl-md border bg-page p-12">{children}</main>
            </div>
            <TailwindIndicator />
          </SearchTextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
