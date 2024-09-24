"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/style";

export type SwitchProps = React.ComponentPropsWithRef<typeof SwitchPrimitives.Root>;

export const Switch = ({ className, ...props }: SwitchProps) => (
  <SwitchPrimitives.Root
    className={cn(
      "group inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border border-neutral-450 bg-neutral-150",
      "hover:bg-neutral-200",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "hover:disabled:bg-neutral-150",
      "data-[state=checked]:border-transparent data-[state=checked]:bg-sky-700",
      "data-[state=checked]:hover:bg-sky-600",
      "data-[state=checked]:disabled:hover:bg-sky-700",
      "dark:border-neutral-400 dark:bg-neutral-800",
      "dark:hover:bg-neutral-700",
      "dark:hover:disabled:bg-neutral-800",
      "dark:data-[state=checked]:border-transparent dark:data-[state=checked]:bg-indigo-300",
      "dark:data-[state=checked]:hover:bg-indigo-400",
      "dark:data-[state=checked]:disabled:hover:bg-indigo-300",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-3.5 w-3.5 rounded-full bg-neutral-750/80 shadow-lg transition-transform",
        "group-hover:h-4 group-hover:w-4",
        "group-disabled:h-3.5 group-disabled:w-3.5",
        "data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-neutral-150",
        "data-[state=unchecked]:translate-x-0.5",
        "dark:bg-neutral-200/80",
        "dark:data-[state=checked]:bg-neutral-850"
      )}
    />
  </SwitchPrimitives.Root>
);
