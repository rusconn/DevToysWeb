"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/style";

export type SwitchProps = React.ComponentPropsWithRef<typeof SwitchPrimitives.Root>;

export const Switch = ({ className, ...props }: SwitchProps) => (
  <SwitchPrimitives.Root
    className={cn(
      "group inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border border-muted-foreground bg-switch",
      "hover:bg-switch-hover",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "hover:disabled:bg-switch",
      "data-[state=checked]:border-transparent data-[state=checked]:bg-indicator",
      "data-[state=checked]:hover:bg-indicator-hover",
      "data-[state=checked]:disabled:hover:bg-indicator",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-3.5 w-3.5 rounded-full bg-foreground/80 shadow-lg transition-transform",
        "group-hover:h-4 group-hover:w-4",
        "group-disabled:h-3.5 group-disabled:w-3.5",
        "data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-background",
        "data-[state=unchecked]:translate-x-0.5"
      )}
    />
  </SwitchPrimitives.Root>
);
