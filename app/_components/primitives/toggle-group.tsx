import { ComponentPropsWithRef } from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import styles from "./toggle-group.module.css";

const ToggleGroup = (
  props: Omit<ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root>, "className">,
) => (
  // @ts-expect-error: why?
  <ToggleGroupPrimitive.Root className={styles.group} {...props} />
);

const ToggleGroupItem = ({
  children,
  ...props
}: Omit<ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item>, "className">) => (
  <ToggleGroupPrimitive.Item className={styles.item} {...props}>
    {children}
  </ToggleGroupPrimitive.Item>
);

export { ToggleGroup, ToggleGroupItem };
