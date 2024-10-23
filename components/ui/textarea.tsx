import * as React from "react";

import { cn } from "@/lib/style";

export type TextareaProps = React.ComponentPropsWithRef<"textarea">;

export const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
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
);
