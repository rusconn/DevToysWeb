import { ReactNode } from "react";

import { cn } from "../_lib/style";

import styles from "./page-root-section.module.css";

type Props = {
  size?: keyof typeof sizes;
  children: ReactNode;
  title: string;
};

export function PageRootSection({ size = "default", children, title }: Props) {
  return (
    <section className={cn(styles.root, sizes[size])}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </section>
  );
}

const sizes = {
  default: undefined,
  fullHeight: styles["size-full-height"],
};
