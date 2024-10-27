"use client";

import { ComponentPropsWithRef } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/_lib/style";

export type SwitchProps = Omit<ComponentPropsWithRef<typeof SwitchPrimitives.Root>, "className"> & {
  peer?: true;
};

export const Switch = ({ peer, ...props }: SwitchProps) => (
  <SwitchPrimitives.Root
    className={cn(
      "group inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border border-neutral-450 bg-neutral-150",
      peer && "peer",
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
      "dark:data-[state=checked]:disabled:hover:bg-indigo-300"
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-3.5 rounded-full bg-neutral-750/80 shadow-lg transition-transform",
        "group-hover:size-4",
        "group-disabled:size-3.5",
        "data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-neutral-150",
        "data-[state=unchecked]:translate-x-0.5",
        "dark:bg-neutral-200/80",
        "dark:data-[state=checked]:bg-neutral-850"
      )}
    />
  </SwitchPrimitives.Root>
);
