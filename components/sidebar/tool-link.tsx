"use client";

import { memo } from "react";
import Link, { LinkProps } from "next/link";

import { Tool } from "@/config/tools";
import { cn } from "@/lib/style";
import { Indicator } from "@/components/indicator";

type Props = Pick<Tool, "Icon" | "shortTitle"> &
  Pick<LinkProps<unknown>, "href" | "onClick"> & {
    highlight: "both" | "indicatorOnly" | "none";
    grouped?: true;
  };

// FIXME: css outline messed up
function RawToolLink({ Icon, shortTitle: title, href, onClick, highlight, grouped }: Props) {
  return (
    <Link
      className={cn(
        "flex h-10 items-center gap-3 rounded",
        highlight === "both" && "bg-accent",
        grouped && "pl-8 -outline-offset-1", // -outline-offset-1: ugly hack for Chrome outlines
        "hover:bg-accent"
      )}
      {...{ href, onClick }}
    >
      <span className={cn("flex items-center", highlight === "none" && "invisible")}>
        <Indicator />
      </span>
      <span className="flex select-none items-center gap-4">
        <Icon size={16} />
        <span>{title}</span>
      </span>
    </Link>
  );
}

export const ToolLink = memo(RawToolLink);
