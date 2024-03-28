import Link from "next/link";

import { Tool } from "@/config/tools";

export type ToolCardProps = Pick<Tool, "Icon" | "longTitle" | "description" | "href">;

export function ToolCard({ Icon, longTitle, description, href }: ToolCardProps) {
  return (
    <Link className="rounded" {...{ href }}>
      <div className="group flex h-80 w-44 flex-col items-center gap-5 overflow-hidden rounded border bg-card p-5 text-card-foreground hover:bg-card-hover">
        <div className="flex flex-col p-5">
          <div className="rounded bg-card-icon p-4 group-hover:bg-card-icon-hover">
            <Icon size={64} />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <h2 className="font-semibold">{longTitle}</h2>
          <p className="text-xs text-card-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}
