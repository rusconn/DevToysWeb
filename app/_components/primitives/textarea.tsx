import { ComponentPropsWithRef } from "react";

import styles from "./textarea.module.css";

export type TextareaProps = Omit<ComponentPropsWithRef<"textarea">, "className">;

export const Textarea = (props: TextareaProps) => (
  <textarea className={styles.textarea} spellCheck="false" {...props} />
);
