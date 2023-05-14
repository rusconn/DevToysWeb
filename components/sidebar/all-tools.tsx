"use client";

import { usePathname } from "next/navigation";

import { singleTools } from "@/config/tools";

import { ToolLink } from "./tool-link";

export function AllTools() {
  const pathname = usePathname();

  return (
    <ToolLink
      Icon={singleTools.allTools.Icon}
      shortTitle={singleTools.allTools.shortTitle}
      href={singleTools.allTools.href}
      highlight={pathname === singleTools.allTools.href ? "both" : "none"}
    />
  );
}
