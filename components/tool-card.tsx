import Link from "next/link";

import { Tool } from "@/config/tools";

export type ToolCardProps = Pick<Tool, "Icon" | "longTitle" | "description" | "href">;

export function ToolCard({ Icon, longTitle, description, href }: ToolCardProps) {
  return (
    <Link className="rounded" {...{ href }}>
      <div className="group flex h-80 w-44 flex-col items-center overflow-hidden rounded border bg-card p-5 pt-0 text-card-foreground hover:bg-card-hover">
        <div className="flex h-44 shrink-0 items-center">
          <div className="rounded bg-card-icon p-4 group-hover:bg-card-icon-hover">
            <Icon size={64} />
          </div>
        </div>
        <h2 className="w-full font-semibold">{longTitle}</h2>
        <p className="mt-1.5 w-full text-xs text-card-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
