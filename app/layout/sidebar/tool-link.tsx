import { Link, type LinkProps } from "react-router";

import type { Tool } from "../../config/tools";
import { cn } from "../../lib/style";
import { Indicator } from "../../components/primitives/indicator";

type Props = Pick<Tool, "Icon" | "shortTitle"> &
  Pick<LinkProps, "onClick"> & {
    path: LinkProps["to"];
    highlight: "both" | "indicatorOnly" | "none";
    grouped?: true;
  };

export function ToolLink({ Icon, shortTitle: title, path, onClick, highlight, grouped }: Props) {
  return (
    <Link
      className={cn(
        "flex h-10 items-center gap-3 rounded",
        highlight === "both" && "bg-neutral-200 dark:bg-neutral-750",
        grouped && "pl-8 -outline-offset-1", // -outline-offset-1: ugly hack for Chrome outlines
        "hover:bg-neutral-200",
        "dark:hover:bg-neutral-750",
      )}
      to={path}
      onClick={onClick}
      prefetch="viewport"
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
