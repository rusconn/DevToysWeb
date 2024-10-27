"use client";

import { ComponentPropsWithRef } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "@/_lib/style";

const ToggleGroup = (
  props: Omit<ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root>, "className">
) => (
  // @ts-expect-error: why?
  <ToggleGroupPrimitive.Root className="flex flex-wrap items-center gap-2.5" {...props} />
);

const ToggleGroupItem = ({
  children,
  ...props
}: Omit<ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item>, "className">) => (
  <ToggleGroupPrimitive.Item
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-neutral-200 px-3 text-sm font-medium ring-offset-neutral-100 transition-colors",
      "hover:bg-neutral-250",
      "disabled:pointer-events-none disabled:opacity-50",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "data-[state=on]:bg-sky-600 data-[state=on]:text-white",
      "dark:bg-neutral-750 dark:ring-offset-neutral-800",
      "dark:hover:bg-neutral-700",
      "dark:data-[state=on]:bg-sky-600 dark:data-[state=on]:text-white"
    )}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Item>
);

export { ToggleGroup, ToggleGroupItem };
