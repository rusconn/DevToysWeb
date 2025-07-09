import { ComponentPropsWithRef } from "react";
import { Select } from "radix-ui";

import { cn } from "../../_lib/style";

import * as icons from "./icons";
import { Indicator } from "./indicator";

import styles from "./select.module.css";

export type Props = ComponentPropsWithRef<typeof Select.Root>;

export const { Root, Group, Value } = Select;

export const Trigger = ({
  children,
  ...props
}: Omit<ComponentPropsWithRef<typeof Select.Trigger>, "className">) => (
  <Select.Trigger className={styles.trigger} {...props}>
    {children}
    <Select.Icon asChild>
      <icons.ChevronDown className={styles["trigger-icon"]} />
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
      {...{ position }}
      className={cn(styles.content, position === "popper" && styles["content-popper"])}
      {...props}
    >
      <Select.Viewport
        className={cn(styles.viewport, position === "popper" && styles["viewport-popper"])}
      >
        {children}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
);

export const Label = (props: Omit<ComponentPropsWithRef<typeof Select.Label>, "className">) => (
  <Select.Label className={styles.label} {...props} />
);

export const Item = ({
  children,
  ...props
}: Omit<ComponentPropsWithRef<typeof Select.Item>, "className">) => (
  <Select.Item className={styles.item} {...props}>
    <span className={styles["item-indicator-container"]}>
      <Select.ItemIndicator className={styles["item-indicator"]}>
        <Indicator />
      </Select.ItemIndicator>
    </span>
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
);

export const Separator = (
  props: Omit<ComponentPropsWithRef<typeof Select.Separator>, "className">,
) => <Select.Separator className={styles.separator} {...props} />;
