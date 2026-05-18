import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { siteConfig } from "./config/site";
import { cn } from "./lib/style";
import { Sidebar } from "./layout/sidebar";
import { SiteHeader } from "./layout/site-header";
import { TailwindIndicator } from "./layout/tailwind-indicator";
import { ThemeScript } from "./layout/theme-script";
import { PageRootSection } from "./components/page-root-section";

import type { Route } from "./+types/root";
import interFont from "./fonts/inter-latin-wght-normal.woff2";
import jetbrainsMonoFont from "./fonts/jetbrains-mono-latin-wght-normal.woff2";
import "./app.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: interFont,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: jetbrainsMonoFont,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "icon",
    href: "/favicon.ico",
    sizes: "32x32",
    type: "image/x-icon",
  },
  {
    rel: "icon",
    href: "/icon.svg",
    sizes: "any",
    type: "image/svg+xml",
  },
  {
    rel: "apple-touch-icon",
    href: "/apple-icon.png",
    sizes: "180x180",
    type: "image/png",
  },
];

export const meta: Route.MetaFunction = () => [
  { title: siteConfig.name },
  { name: "description", content: siteConfig.description },
  { name: "googlebot", content: "index" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="white" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
        <meta name="application-name" content="DevToysWeb" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta property="og:title" content="DevToysWeb" />
        <meta property="og:description" content="A web clone of DevToys" />
        <meta property="og:site_name" content="DevToysWeb" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="DevToysWeb" />
        <meta name="twitter:description" content="A web clone of DevToys" />
        <meta
          name="google-site-verification"
          content="LlndxXYLHOwTH1LOIcckAWY3xg3y9TMfL-U__wnKAFw"
        />
        <ThemeScript />
        <Meta />
        <Links />
      </head>
      <body
        className={cn(
          "h-screen bg-neutral-150 font-medium font-sans text-neutral-750 text-sm antialiased",
          "dark:bg-neutral-850 dark:text-neutral-200",
        )}
      >
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <PageRootSection title={message}>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </PageRootSection>
  );
}
