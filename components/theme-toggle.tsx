"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { icons } from "@/components/icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const sunIcon = useMemo(
    () => (
      <icons.Sun className="h-7 w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    ),
    []
  );
  const moonIcon = useMemo(
    () => (
      <icons.Moon className="absolute h-7 w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    ),
    []
  );

  return (
    <Button
      className="h-10 w-10 p-0"
      variant="ghost"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {sunIcon}
      {moonIcon}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
