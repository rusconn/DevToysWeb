import { ComponentPropsWithRef } from "react";

import { cn } from "../../_lib/style";

import styles from "./button.module.css";

export type ButtonProps = Omit<ComponentPropsWithRef<"button">, "className"> & {
  variant: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const Button = ({ variant, size = "default", ...props }: ButtonProps) => (
  <button className={cn(styles.base, variants[variant], sizes[size])} type="button" {...props} />
);

const variants = {
  theme: styles["variant-theme"],
  search: styles["variant-search"],
  control: styles["variant-control"],
  accent: styles["variant-accent"],
};

const sizes = {
  default: styles["size-default"],
  taller: styles["size-taller"],
  shorter: styles["size-shorter"],
};
