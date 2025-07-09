import { PropsWithChildren, ReactNode } from "react";

import styles from "./configuration.module.css";

export function Configuration({ children }: PropsWithChildren) {
  return <ul className={styles.root}>{children}</ul>;
}

export function ConfigurationItem({
  icon,
  title,
  description,
  control,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  control: ReactNode;
}) {
  return (
    <li className={styles.item}>
      {icon}
      {description ? (
        <div className={styles["item-description-container"]}>
          <span>{title}</span>
          <span className={styles["item-description"]}>{description}</span>
        </div>
      ) : (
        <span>{title}</span>
      )}
      <div className={styles["item-control"]}>{control}</div>
    </li>
  );
}
