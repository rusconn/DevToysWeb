import * as React from "react";
import equal from "react-fast-compare";

import { cn } from "@/lib/style";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const RawTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      {...{ ref }}
      className={cn(
        "border-b-1 resize-none rounded border border-b-neutral-450 bg-neutral-50 px-3 py-2 font-mono outline-none",
        "placeholder:text-neutral-450",
        "hover:bg-neutral-100",
        "focus:border-b-2 focus:border-b-sky-700 focus:bg-neutral-0 focus:pb-[7px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-b-neutral-400 dark:bg-neutral-750",
        "dark:placeholder:text-neutral-400",
        "dark:hover:bg-neutral-700",
        "dark:focus:border-b-indigo-300 dark:focus:bg-neutral-850",
        className
      )}
      spellCheck="false"
      {...props}
    />
  )
);
RawTextarea.displayName = "RawTextarea";

export const Textarea = React.memo(RawTextarea, equal);
