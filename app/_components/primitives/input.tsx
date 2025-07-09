import { ComponentPropsWithRef } from "react";

import { cn } from "../../_lib/style";

import styles from "./input.module.css";

export type InputProps = Omit<ComponentPropsWithRef<"input">, "className"> & {
  variant?: keyof typeof variants;
};

export const Input = ({ variant = "default", ...props }: InputProps) => (
  <input className={cn(styles.input, variants[variant])} spellCheck="false" {...props} />
);

const variants = {
  search: styles["input-search"],
  default: styles["input-default"],
};
