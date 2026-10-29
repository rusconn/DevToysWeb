import type { ComponentPropsWithRef } from "react";

import { Select } from "@base-ui/react/select";

import { cn } from "../../lib/style";

import * as icons from "./icons";
import { Indicator } from "./indicator";

export type Props = ComponentPropsWithRef<typeof Select.Root>;

export const { Root, Group, Value } = Select;

export const Trigger = ({
  children,
  ...props
}: Omit<ComponentPropsWithRef<typeof Select.Trigger>, "className">) => (
  <Select.Trigger
    className={cn(
      "flex h-9 w-28 items-center justify-between rounded-md border bg-neutral-50 px-2.5 py-1.5",
      "placeholder:text-neutral-450",
      "hover:bg-neutral-100",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "dark:bg-neutral-700",
      "dark:placeholder:text-neutral-400",
      "dark:hover:bg-neutral-650",
    )}
    {...props}
  >
    {children}
    <Select.Icon render={<icons.ChevronDown className="size-4 opacity-50" />} />
  </Select.Trigger>
);

export const Content = ({
  children,
  ...props
}: Omit<ComponentPropsWithRef<typeof Select.Positioner>, "className">) => (
  <Select.Portal>
    <Select.Positioner alignItemWithTrigger={false} {...props}>
      <Select.Popup
        className={cn(
          "fade-in-80 animate-in text-neutral-750 relative z-50 overflow-hidden rounded-md border bg-neutral-50 shadow-md",
          "dark:bg-neutral-800 dark:text-neutral-200",
          "translate-y-1",
        )}
      >
        <Select.List className="min-w-(--anchor-width) p-1">{children}</Select.List>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
);

export const Label = (props: Omit<ComponentPropsWithRef<typeof Select.Label>, "className">) => (
  <Select.Label className="py-1.5 pr-2 pl-8 font-semibold" {...props} />
);

export const Item = ({
  children,
  ...props
}: Omit<ComponentPropsWithRef<typeof Select.Item>, "className">) => (
  <Select.Item
    className={cn(
      "relative flex w-full cursor-default items-center rounded-sm px-2.5 py-1.5 outline-hidden select-none",
      "hover:bg-neutral-150",
      "focus:bg-neutral-150",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "dark:hover:bg-neutral-750",
      "dark:focus:bg-neutral-750",
    )}
    {...props}
  >
    <span className="absolute left-0">
      <Select.ItemIndicator className="flex items-center">
        <Indicator />
      </Select.ItemIndicator>
    </span>
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
);

export const Separator = (
  props: Omit<ComponentPropsWithRef<typeof Select.Separator>, "className">,
) => <Select.Separator className="bg-neutral-850 -mx-1 my-1 h-px" {...props} />;
