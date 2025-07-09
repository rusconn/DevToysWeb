import { ReactNode } from "react";
import { Label } from "radix-ui";

import { Switch, SwitchProps } from "./primitives/switch";

import styles from "./labeled-switch.module.css";

type Props = Omit<SwitchProps, "id"> & {
  id: string;
  label: ReactNode;
};

export function LabeledSwitch({ id, label, ...props }: Props) {
  return (
    <div className={styles.container}>
      <Switch {...{ id }} {...props} />
      <Label.Root className={styles.label} htmlFor={id}>
        {label}
      </Label.Root>
    </div>
  );
}
