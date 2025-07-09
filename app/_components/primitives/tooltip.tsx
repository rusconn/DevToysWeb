import { ComponentPropsWithRef } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import styles from "./tooltip.module.css";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = ({
  sideOffset = 4,
  ...props
}: Omit<ComponentPropsWithRef<typeof TooltipPrimitive.Content>, "className">) => (
  <TooltipPrimitive.Content {...{ sideOffset }} className={styles.content} {...props} />
);
