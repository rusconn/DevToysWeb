import type { ComponentPropsWithRef } from "react";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "../../lib/style";

export const Separator = ({
  orientation = "horizontal",
  ...props
}: Omit<ComponentPropsWithRef<typeof SeparatorPrimitive>, "className">) => (
  <SeparatorPrimitive
    orientation={orientation}
    className={cn(
      "bg-neutral-200",
      "dark:bg-neutral-750",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
    )}
    {...props}
  />
);
