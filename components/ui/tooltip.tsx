"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/style";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    {...{ ref, sideOffset }}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-neutral-100 px-3 py-1.5 text-neutral-700 shadow-md animate-in fade-in-50",
      "data-[side=bottom]:slide-in-from-top-1",
      "data-[side=left]:slide-in-from-right-1",
      "data-[side=right]:slide-in-from-left-1",
      "data-[side=top]:slide-in-from-bottom-1",
      "dark:bg-neutral-800 dark:text-neutral-200",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
