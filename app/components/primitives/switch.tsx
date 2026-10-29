import type { ComponentPropsWithRef } from "react";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "../../lib/style";

export type SwitchProps = Omit<ComponentPropsWithRef<typeof SwitchPrimitive.Root>, "className"> & {
  peer?: true;
};

export const Switch = ({ peer, ...props }: SwitchProps) => (
  <SwitchPrimitive.Root
    nativeButton
    render={<button type="button" />}
    className={cn(
      "group border-neutral-450 bg-neutral-150 inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border",
      peer && "peer",
      "hover:bg-neutral-200",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "hover:disabled:bg-neutral-150",
      "data-checked:border-transparent data-checked:bg-sky-700",
      "data-checked:hover:bg-sky-600",
      "data-checked:disabled:hover:bg-sky-700",
      "dark:border-neutral-400 dark:bg-neutral-800",
      "dark:hover:bg-neutral-700",
      "dark:hover:disabled:bg-neutral-800",
      "dark:data-checked:border-transparent dark:data-checked:bg-indigo-300",
      "dark:data-checked:hover:bg-indigo-400",
      "dark:data-checked:disabled:hover:bg-indigo-300",
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "bg-neutral-750/80 pointer-events-none block size-3.5 rounded-full shadow-lg transition-transform",
        "group-hover:size-4",
        "group-disabled:size-3.5",
        "data-checked:bg-neutral-150 data-checked:translate-x-5.5",
        "data-unchecked:translate-x-0.5",
        "dark:bg-neutral-200/80",
        "dark:data-checked:bg-neutral-850",
      )}
    />
  </SwitchPrimitive.Root>
);
