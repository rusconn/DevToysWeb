"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@/lib/style";
import * as icons from "@/components/icons";
import { Indicator } from "@/components/indicator";

export type Props = React.ComponentPropsWithRef<typeof SelectPrimitive.Root>;

export const { Root, Group, Value } = SelectPrimitive;

export const Trigger = ({
  children,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>, "className">) => (
  <SelectPrimitive.Trigger
    className={cn(
      "flex h-9 w-28 items-center justify-between rounded-md border bg-neutral-50 px-2.5 py-1.5",
      "placeholder:text-neutral-450",
      "hover:bg-neutral-100",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "dark:bg-neutral-700",
      "dark:placeholder:text-neutral-400",
      "dark:hover:bg-neutral-650"
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <icons.ChevronDown className="size-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

export const Content = ({
  children,
  position = "popper",
  ...props
}: Omit<React.ComponentPropsWithRef<typeof SelectPrimitive.Content>, "className">) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      {...{ position }}
      className={cn(
        "relative z-50 overflow-hidden rounded-md border bg-neutral-50 text-neutral-750 shadow-md animate-in fade-in-80",
        "dark:bg-neutral-800 dark:text-neutral-200",
        position === "popper" && "translate-y-1"
      )}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

export const Label = (
  props: Omit<React.ComponentPropsWithRef<typeof SelectPrimitive.Label>, "className">
) => <SelectPrimitive.Label className="py-1.5 pl-8 pr-2 font-semibold" {...props} />;

export const Item = ({
  children,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof SelectPrimitive.Item>, "className">) => (
  <SelectPrimitive.Item
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm px-2.5 py-1.5 outline-none",
      "hover:bg-neutral-150",
      "focus:bg-neutral-150",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "dark:hover:bg-neutral-750",
      "dark:focus:bg-neutral-750"
    )}
    {...props}
  >
    <span className="absolute left-0">
      <SelectPrimitive.ItemIndicator className="flex items-center">
        <Indicator />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

export const Separator = (
  props: Omit<React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>, "className">
) => <SelectPrimitive.Separator className="-mx-1 my-1 h-px bg-neutral-850" {...props} />;
