"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@/lib/style";
import * as icons from "@/components/icons";
import { Indicator } from "@/components/indicator";

export type Props = React.ComponentPropsWithRef<typeof SelectPrimitive.Root>;

export const { Root, Group, Value } = SelectPrimitive;

export const Trigger = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>) => (
  <SelectPrimitive.Trigger
    className={cn(
      "flex h-9 items-center justify-between rounded-md border bg-select px-2.5 py-1.5",
      "placeholder:text-muted-foreground",
      "hover:bg-select-hover",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <icons.ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

export const Content = ({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      {...{ position }}
      className={cn(
        "relative z-50 overflow-hidden rounded-md border bg-select-content text-select-content-foreground shadow-md animate-in fade-in-80",
        position === "popper" && "translate-y-1",
        className
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

export const Label = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label className={cn("py-1.5 pl-8 pr-2 font-semibold", className)} {...props} />
);

export const Item = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm px-2.5 py-1.5 outline-none",
      "hover:bg-select-item-hover",
      "focus:bg-select-item-focus",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
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

export const Separator = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
);
