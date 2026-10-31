import { useSyncExternalStore } from "react";

import { useTheme as useNextTheme } from "next-themes";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = Exclude<Theme, "system">;

/**
 * Thin adapter around next-themes
 *
 * next-themes reads localStorage during the first client render, while the
 * prerendered HTML is generated without a window. To keep hydration consistent
 * with the server output, consumers see the server defaults ("system" resolved
 * to "light") until hydration completes, then get the actual values.
 *
 * The hydration check uses useSyncExternalStore instead of a mounted flag so
 * components mounted later (e.g. on client-side navigation) read the real
 * values immediately instead of flashing the server defaults first.
 */
export function useTheme() {
  const { theme, resolvedTheme, setTheme: setNextTheme } = useNextTheme();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const currentTheme: Theme = (hydrated && normalizeTheme(theme)) || "system";
  const currentResolvedTheme: ResolvedTheme =
    (hydrated && normalizeResolvedTheme(resolvedTheme)) || "light";

  const setTheme = (newTheme: Theme) => {
    setNextTheme(newTheme);
  };

  const toggleTheme = () => {
    setNextTheme(currentResolvedTheme === "light" ? "dark" : "light");
  };

  return {
    theme: currentTheme,
    resolvedTheme: currentResolvedTheme,
    setTheme,
    toggleTheme,
  };
}

// must be a singleton
const subscribe = () => () => {};

function normalizeTheme(value: string | undefined): Theme {
  return value === "light" || value === "dark" ? value : "system";
}

function normalizeResolvedTheme(value: string | undefined): ResolvedTheme {
  return value === "dark" ? "dark" : "light";
}
