import "@/styles/globals.css";

import { Metadata } from "next";
import { SearchTextProvider } from "@/contexts/search-text";

import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/style";
import { Sidebar } from "@/components/sidebar";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    siteName: siteConfig.name,
    type: "website",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  verification: {
    google: "LlndxXYLHOwTH1LOIcckAWY3xg3y9TMfL-U__wnKAFw",
  },
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
            <div className="relative flex h-full flex-col">
              <SiteHeader />
              <div className="flex flex-1 overflow-y-hidden">
                <Sidebar />
                <main className="h-full flex-1 overflow-y-auto rounded-tl-md border bg-page p-12">
                  {children}
                </main>
              </div>
            </div>
            <TailwindIndicator />
          </SearchTextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
