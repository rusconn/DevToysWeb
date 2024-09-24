import Link from "next/link";

import { Tool } from "@/config/tools";
import { cn } from "@/lib/style";

export type ToolCardProps = Pick<Tool, "Icon" | "longTitle" | "description" | "href">;

export function ToolCard({ Icon, longTitle, description, href }: ToolCardProps) {
  return (
    <Link className="rounded" {...{ href }}>
      <div
        className={cn(
          "group flex h-80 w-44 flex-col items-center gap-5 overflow-hidden rounded border bg-neutral-50 p-5 text-neutral-850",
          "hover:bg-neutral-150",
          "dark:bg-neutral-750 dark:text-neutral-200",
          "dark:hover:bg-neutral-700"
        )}
      >
        <div className="flex flex-col p-5">
          <div
            className={cn(
              "rounded bg-neutral-50 p-4",
              "group-hover:bg-neutral-50",
              "dark:bg-neutral-700",
              "dark:group-hover:bg-neutral-650"
            )}
          >
            <Icon size={64} />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <h2 className="font-semibold">{longTitle}</h2>
          <p
            className={cn(
              "text-xs text-neutral-450", //
              "dark:text-neutral-350"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
