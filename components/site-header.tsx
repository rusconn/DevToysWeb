import Link from "next/link";

import { siteConfig } from "@/config/site";
import { icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="flex h-14 items-center justify-between px-4">
      <div className="flex items-baseline space-x-2.5">
        <Link className="text-lg" href="/">
          {siteConfig.name}
        </Link>
        <small className="text-xs">
          web clone of{" "}
          <a
            className="text-link hover:underline"
            href={siteConfig.links.devtoys}
            target="_blank"
            rel="noreferrer"
          >
            DevToys
          </a>
        </small>
      </div>
      <div className="flex items-center space-x-1">
        <a
          className="group rounded-md p-2"
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <icons.GitHub className="h-6 w-6 group-hover:opacity-70" />
            <span className="sr-only">GitHub</span>
          </div>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
