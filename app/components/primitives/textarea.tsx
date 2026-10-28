import type { ComponentPropsWithRef } from "react";

import { cn } from "../../lib/style";

export type TextareaProps = Omit<ComponentPropsWithRef<"textarea">, "className">;

export const Textarea = (props: TextareaProps) => (
  <textarea
    className={cn(
      "border-b-neutral-450 resize-none rounded border bg-neutral-50 px-3 py-2 font-mono outline-hidden",
      "placeholder:text-neutral-450",
      "hover:bg-neutral-100",
      "focus:bg-neutral-0 focus:border-b-2 focus:border-b-sky-700 focus:pb-1.75",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "dark:bg-neutral-750 dark:border-b-neutral-400",
      "dark:placeholder:text-neutral-400",
      "dark:hover:bg-neutral-700",
      "dark:focus:bg-neutral-850 dark:focus:border-b-indigo-300",
    )}
    spellCheck="false"
    {...props}
  />
);
