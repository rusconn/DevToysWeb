"use client";

import { memo } from "react";
import Link, { LinkProps } from "next/link";

import { Tool } from "@/config/tools";
import { cn } from "@/lib/style";
import { Indicator } from "@/components/indicator";

type Props = Pick<Tool, "Icon" | "shortTitle"> &
  Pick<LinkProps<unknown>, "className" | "href" | "onClick"> & {
    highlight: "both" | "indicatorOnly" | "none";
  };

function RawToolLink({ Icon, shortTitle: title, href, onClick, className, highlight }: Props) {
  return (
    <Link
      className={cn(
        "flex h-10 items-center gap-3 rounded",
        highlight === "both" && "bg-accent",
        "hover:bg-accent",
        className
      )}
      {...{ href, onClick }}
    >
      <span className={cn("invisible flex items-center", highlight !== "none" && "visible")}>
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
