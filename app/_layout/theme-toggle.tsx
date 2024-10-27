"use client";

import { useTheme } from "@/_contexts/theme";
import { Button } from "@/_components/primitives/button";
import * as icons from "@/_components/primitives/icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="theme"
      size="taller"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      <icons.Sun className="size-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <icons.Moon className="absolute size-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
