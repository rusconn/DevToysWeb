"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/style";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = ({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithRef<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Content
    {...{ sideOffset }}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-tooltip px-3 py-1.5 text-tooltip-foreground shadow-md animate-in fade-in-50",
      "data-[side=bottom]:slide-in-from-top-1",
      "data-[side=left]:slide-in-from-right-1",
      "data-[side=right]:slide-in-from-left-1",
      "data-[side=top]:slide-in-from-bottom-1",
      className
    )}
    {...props}
  />
);
