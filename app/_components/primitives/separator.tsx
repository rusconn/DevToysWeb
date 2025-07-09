import { ComponentPropsWithRef } from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

import { cn } from "../../_lib/style";

import styles from "./separator.module.css";

export const Separator = ({
  orientation = "horizontal",
  decorative = true,
  ...props
}: Omit<ComponentPropsWithRef<typeof SeparatorPrimitive.Root>, "className">) => (
  <SeparatorPrimitive.Root
    {...{ decorative, orientation }}
    className={cn(
      styles.separator,
      orientation === "horizontal" ? styles["separator-horizontal"] : styles["separator-vertical"],
    )}
    {...props}
  />
);
