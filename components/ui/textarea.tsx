import * as React from "react";
import equal from "react-fast-compare";

import { cn } from "@/lib/style";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const RawTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      {...{ ref }}
      className={cn(
        "border-b-1 resize-none rounded border border-b-muted-foreground bg-textarea px-3 py-2 font-mono outline-none",
        "placeholder:text-muted-foreground",
        "hover:bg-textarea-hover",
        "focus:border-b-2 focus:border-b-indicator focus:bg-textarea-focus focus:pb-[7px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      spellCheck="false"
      {...props}
    />
  )
);
RawTextarea.displayName = "RawTextarea";

export const Textarea = React.memo(RawTextarea, equal);
