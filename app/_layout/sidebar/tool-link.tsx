import Link, { LinkProps } from "next/link";

import { Tool } from "../../_config/tools";
import { cn } from "../../_lib/style";
import { Indicator } from "../../_components/primitives/indicator";

type Props = Pick<Tool, "Icon" | "shortTitle"> &
  Pick<LinkProps<unknown>, "href" | "onClick"> & {
    highlight: "both" | "indicatorOnly" | "none";
    grouped?: true;
  };

// FIXME: css outline messed up
export function ToolLink({ Icon, shortTitle: title, href, onClick, highlight, grouped }: Props) {
  return (
    <Link
      className={cn(
        "flex h-10 items-center gap-3 rounded",
        highlight === "both" && "bg-neutral-200 dark:bg-neutral-750",
        grouped && "pl-8 -outline-offset-1", // -outline-offset-1: ugly hack for Chrome outlines
        "hover:bg-neutral-200",
        "dark:hover:bg-neutral-750",
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
