"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import * as icons from "@/components/icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="theme"
      size="taller"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      <icons.Sun className="h-7 w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <icons.Moon className="absolute h-7 w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
