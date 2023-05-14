import * as React from "react";

import { cn } from "@/lib/style";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      {...{ ref }}
      className={cn(
        "border-b-1 flex h-9 w-full rounded border border-b-muted-foreground bg-input px-3 py-2 font-mono outline-none placeholder:text-muted-foreground hover:bg-input-hover focus:border-b-2 focus:border-b-indicator focus:bg-input-focus focus:pb-[7px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      spellCheck="false"
      {...props}
    />
  )
);
Input.displayName = "Input";
