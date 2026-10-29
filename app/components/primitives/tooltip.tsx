import type { ComponentPropsWithRef, ReactNode } from "react";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "../../lib/style";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = ({
  sideOffset = 4,
  children,
  ...props
}: Omit<ComponentPropsWithRef<typeof TooltipPrimitive.Positioner>, "className" | "children"> & {
  children?: ReactNode;
}) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Positioner sideOffset={sideOffset} {...props}>
      <TooltipPrimitive.Popup
        className={cn(
          "fade-in-50 animate-in z-50 overflow-hidden rounded-md border bg-neutral-100 px-3 py-1.5 text-neutral-700 shadow-md",
          "data-[side=bottom]:slide-in-from-top-1",
          "data-[side=left]:slide-in-from-right-1",
          "data-[side=right]:slide-in-from-left-1",
          "data-[side=top]:slide-in-from-bottom-1",
          "dark:bg-neutral-800 dark:text-neutral-200",
        )}
      >
        {children}
      </TooltipPrimitive.Popup>
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
);
