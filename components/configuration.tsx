import { memo } from "react";
import equal from "react-fast-compare";

import { cn } from "@/lib/style";

type Props = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  control: React.ReactNode;
};

function RawConfiguration({ icon, title, description, control }: Props) {
  return (
    <div
      className={cn(
        "flex h-16 items-center gap-6 rounded border bg-neutral-50 px-4",
        "dark:bg-neutral-750"
      )}
    >
      {icon}
      {description ? (
        <div className="flex flex-col">
          <span>{title}</span>
          <span
            className={cn(
              "text-xs text-neutral-450", //
              "dark:text-neutral-400"
            )}
          >
            {description}
          </span>
        </div>
      ) : (
        <span>{title}</span>
      )}
      <div className="flex flex-1 justify-end">{control}</div>
    </div>
  );
}

export const Configuration = memo(RawConfiguration, equal);
