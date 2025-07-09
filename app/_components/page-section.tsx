import { ReactNode } from "react";

import { cn } from "../_lib/style";

import styles from "./page-section.module.css";

type Props = {
  size?: keyof typeof sizes;
  hidden?: true;
  children: ReactNode;
  title: string;
  control?: ReactNode;
};

export function PageSection({ size = "default", hidden, children, title, control }: Props) {
  return (
    <section className={cn(styles.root, sizes[size], hidden && styles.hidden)}>
      {control ? (
        <div className={styles["control-container"]}>
          <h2 className={cn(styles.title, styles["control-title"])}>{title}</h2>
          <div>{control}</div>
        </div>
      ) : (
        <h2 className={styles.title}>{title}</h2>
      )}
      {children}
    </section>
  );
}

const sizes = {
  default: undefined,
  fullHeight: styles["size-full-height"],
};
