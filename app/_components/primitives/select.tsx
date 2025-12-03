import type { ComponentPropsWithRef } from "react";
import { Select } from "radix-ui";

import { cn } from "../../_lib/style";

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
    <Select.Icon asChild>
      <icons.ChevronDown className="size-4 opacity-50" />
    </Select.Icon>
  </Select.Trigger>
);

export const Content = ({
  children,
  position = "popper",
  ...props
}: Omit<ComponentPropsWithRef<typeof Select.Content>, "className">) => (
  <Select.Portal>
    <Select.Content
      position={position}
      className={cn(
        "fade-in-80 relative z-50 animate-in overflow-hidden rounded-md border bg-neutral-50 text-neutral-750 shadow-md",
        "dark:bg-neutral-800 dark:text-neutral-200",
        position === "popper" && "translate-y-1",
      )}
      {...props}
    >
      <Select.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </Select.Viewport>
    </Select.Content>
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
      "relative flex w-full cursor-default select-none items-center rounded-sm px-2.5 py-1.5 outline-none",
      "hover:bg-neutral-150",
      "focus:bg-neutral-150",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
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
) => <Select.Separator className="-mx-1 my-1 h-px bg-neutral-850" {...props} />;
