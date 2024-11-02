"use client";

import { usePathname } from "next/navigation";

import { singleTools } from "../../_config/tools";

import { ToolLink } from "./tool-link";

export function Settings() {
  const pathname = usePathname();

  return (
    <ToolLink
      Icon={singleTools.settings.Icon}
      shortTitle={singleTools.settings.shortTitle}
      href={singleTools.settings.href}
      highlight={pathname === singleTools.settings.href ? "both" : "none"}
    />
  );
}
