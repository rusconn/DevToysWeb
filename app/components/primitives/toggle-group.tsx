import type { ComponentPropsWithRef } from "react";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";

import { cn } from "../../lib/style";

const ToggleGroup = (
  props: Omit<ComponentPropsWithRef<typeof ToggleGroupPrimitive>, "className">,
) => <ToggleGroupPrimitive className="flex flex-wrap items-center gap-2.5" {...props} />;

const ToggleGroupItem = ({
  children,
  ...props
}: Omit<ComponentPropsWithRef<typeof Toggle>, "className">) => (
  <Toggle
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-neutral-200 px-3 text-sm font-medium ring-sky-400 ring-offset-neutral-100 transition-colors",
      "hover:bg-neutral-250",
      "disabled:pointer-events-none disabled:opacity-50",
      "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
      "data-pressed:bg-sky-600 data-pressed:text-white",
      "dark:bg-neutral-750 dark:ring-sky-800 dark:ring-offset-neutral-800",
      "dark:hover:bg-neutral-700",
      "dark:data-pressed:bg-sky-600 dark:data-pressed:text-white",
    )}
    {...props}
  >
    {children}
  </Toggle>
);

export { ToggleGroup, ToggleGroupItem };
