import * as React from "react";

import { cn } from "@/lib/style";

export type InputProps = React.ComponentPropsWithRef<"input"> & {
  fontMono?: true;
};

export const Input = ({ className, fontMono, ...props }: InputProps) => (
  <input
    className={cn(
      "h-9 rounded border border-b-neutral-450 bg-neutral-50 px-3 py-2 outline-none",
      "placeholder:text-neutral-450",
      "hover:bg-neutral-100",
      "focus:border-b-2 focus:border-b-sky-700 focus:bg-neutral-0 focus:pb-[7px]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      fontMono && "font-mono",
      "dark:border-b-neutral-400 dark:bg-neutral-750",
      "dark:placeholder:text-neutral-400",
      "dark:hover:bg-neutral-700",
      "dark:focus:border-b-indigo-300 dark:focus:bg-neutral-850",
      className
    )}
    spellCheck="false"
    {...props}
  />
);
