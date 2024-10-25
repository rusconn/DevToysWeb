import * as React from "react";

import { cn } from "@/lib/style";

export type InputProps = React.ComponentPropsWithRef<"input"> & {
  fontMono?: true;
};

export const Input = ({ className, fontMono, ...props }: InputProps) => (
  <input
    className={cn(
      "h-9 rounded border border-b-muted-foreground bg-input px-3 py-2 outline-none",
      "placeholder:text-muted-foreground",
      "hover:bg-input-hover",
      "focus:border-b-2 focus:border-b-indicator focus:bg-input-focus focus:pb-[7px]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      fontMono && "font-mono",
      className
    )}
    spellCheck="false"
    {...props}
  />
);
