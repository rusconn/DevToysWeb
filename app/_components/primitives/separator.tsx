"use client";

import { ComponentPropsWithRef } from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

import { cn } from "../../_lib/style";

export const Separator = ({
  orientation = "horizontal",
  decorative = true,
  ...props
}: Omit<ComponentPropsWithRef<typeof SeparatorPrimitive.Root>, "className">) => (
  <SeparatorPrimitive.Root
    {...{ decorative, orientation }}
    className={cn(
      "bg-neutral-200",
      "dark:bg-neutral-750",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px"
    )}
    {...props}
  />
);
