import { ComponentPropsWithRef } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "../../_lib/style";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = ({
  sideOffset = 4,
  ...props
}: Omit<ComponentPropsWithRef<typeof TooltipPrimitive.Content>, "className">) => (
  <TooltipPrimitive.Content
    {...{ sideOffset }}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-neutral-100 px-3 py-1.5 text-neutral-700 shadow-md animate-in fade-in-50",
      "data-[side=bottom]:slide-in-from-top-1",
      "data-[side=left]:slide-in-from-right-1",
      "data-[side=right]:slide-in-from-left-1",
      "data-[side=top]:slide-in-from-bottom-1",
      "dark:bg-neutral-800 dark:text-neutral-200",
    )}
    {...props}
  />
);
