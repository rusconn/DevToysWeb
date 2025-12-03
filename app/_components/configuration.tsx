import { PropsWithChildren, ReactNode } from "react";

import { cn } from "../_lib/style";

export function Configuration({ children }: PropsWithChildren) {
  return <ul className="flex flex-col gap-1.5">{children}</ul>;
}

export type ConfigurationItemProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  control: ReactNode;
};

export function ConfigurationItem({ icon, title, description, control }: ConfigurationItemProps) {
  return (
    <li
      className={cn(
        "flex h-16 items-center gap-6 rounded border bg-neutral-50 px-4",
        "dark:bg-neutral-750",
      )}
    >
      {icon}
      {description ? (
        <div className="flex flex-col">
          <span>{title}</span>
          <span
            className={cn(
              "text-xs text-neutral-450", //
              "dark:text-neutral-400",
            )}
          >
            {description}
          </span>
        </div>
      ) : (
        <span>{title}</span>
      )}
      <div className="flex flex-1 justify-end">{control}</div>
    </li>
  );
}
