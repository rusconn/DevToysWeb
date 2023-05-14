"use client";

import { memo, useMemo } from "react";
import Link, { LinkProps } from "next/link";

import { Tool } from "@/config/tools";
import { cn } from "@/lib/style";
import { Indicator } from "@/components/indicator";

type Props = Pick<Tool, "Icon" | "shortTitle"> &
  Pick<LinkProps<unknown>, "className" | "href" | "onClick"> & {
    highlight: "both" | "indicatorOnly" | "none";
  };

function RawToolLink({ Icon, shortTitle: title, href, onClick, className, highlight }: Props) {
  const icon = useMemo(() => <Icon size={16} />, [Icon]);

  return (
    <Link
      className={cn(
        "flex h-10 items-center gap-3 rounded hover:bg-accent",
        highlight === "both" && "bg-accent",
        className
      )}
      {...{ href, onClick }}
    >
      <span className={cn("invisible flex items-center", highlight !== "none" && "visible")}>
        <Indicator />
      </span>
      <span className="flex select-none items-center">
        {icon}
        <span className="ml-4">{title}</span>
      </span>
    </Link>
  );
}

export const ToolLink = memo(RawToolLink);
