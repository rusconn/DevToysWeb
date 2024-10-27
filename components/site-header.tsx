import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/style";
import * as icons from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-4">
      <div className="flex items-baseline gap-x-2.5">
        <Link className="text-lg" href="/">
          {siteConfig.name}
        </Link>
        <small className="text-xs">
          web clone of{" "}
          <a
            className={cn(
              "text-sky-700 hover:underline", //
              "dark:text-indigo-300"
            )}
            href={siteConfig.links.devtoys}
            target="_blank"
            rel="noreferrer"
          >
            DevToys
          </a>
        </small>
      </div>
      <div className="flex gap-x-1">
        <a
          className="group h-10 w-10 rounded-md p-2"
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
        >
          <icons.GitHub className="group-hover:opacity-70" />
          <span className="sr-only">GitHub</span>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
