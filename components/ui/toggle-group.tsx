"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "@/lib/style";

const ToggleGroup = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root>) => (
  <ToggleGroupPrimitive.Root className={cn("flex items-center gap-2.5", className)} {...props} />
);

const ToggleGroupItem = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item>) => (
  <ToggleGroupPrimitive.Item
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-neutral-200 px-3 text-sm font-medium ring-offset-neutral-100 transition-colors",
      "hover:bg-neutral-250",
      "disabled:pointer-events-none disabled:opacity-50",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "data-[state=on]:bg-sky-600 data-[state=on]:text-white",
      "dark:bg-neutral-750 dark:ring-offset-neutral-800",
      "dark:hover:bg-neutral-700",
      "dark:data-[state=on]:bg-sky-600 dark:data-[state=on]:text-white",
      className
    )}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Item>
);

export { ToggleGroup, ToggleGroupItem };
