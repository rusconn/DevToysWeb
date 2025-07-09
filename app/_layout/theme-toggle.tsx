"use client";

import { useTheme } from "next-themes";

import { Button } from "../_components/primitives/button";
import * as icons from "../_components/primitives/icons";

import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="theme"
      size="taller"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      <icons.Sun className={styles.light} />
      <icons.Moon className={styles.dark} />
      <span className={styles["sr-only"]}>Toggle theme</span>
    </Button>
  );
}
