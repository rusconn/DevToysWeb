import { ComponentPropsWithRef } from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import styles from "./switch.module.css";

export type SwitchProps = Omit<ComponentPropsWithRef<typeof SwitchPrimitive.Root>, "className">;

export const Switch = (props: SwitchProps) => (
  <SwitchPrimitive.Root className={styles.root} {...props}>
    <SwitchPrimitive.Thumb className={styles.thumb} />
  </SwitchPrimitive.Root>
);
