import { useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark" | "system";

type ThemeSnapshot = `${Theme}:${"light" | "dark"}`;

const themeStore = {
  subscribe(callback: () => void) {
    if (typeof window === "undefined") {
      return () => {};
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    window.addEventListener("storage", callback);
    mediaQuery.addEventListener("change", callback);
    window.addEventListener("theme-change", callback);

    return () => {
      window.removeEventListener("storage", callback);
      mediaQuery.removeEventListener("change", callback);
      window.removeEventListener("theme-change", callback);
    };
  },

  getSnapshot(): ThemeSnapshot {
    if (typeof window === "undefined") {
      return "system:light";
    }

    const preference = (localStorage.getItem("theme") as Theme) || "system";
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = preference === "system" ? (isSystemDark ? "dark" : "light") : preference;

    return `${preference}:${resolved}`;
  },

  getServerSnapshot(): ThemeSnapshot {
    return "system:light";
  },

  setTheme(theme: Theme) {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new CustomEvent("theme-change"));
  },
};

export function useTheme() {
  const snapshot = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );

  const [theme, resolvedTheme] = snapshot.split(":") as [Theme, "light" | "dark"];

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = (newTheme: Theme) => {
    if (typeof window === "undefined") {
      return;
    }
    themeStore.setTheme(newTheme);
  };

  const toggleTheme = () => {
    const toggled = resolvedTheme === "light" ? "dark" : "light";
    setTheme(toggled);
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}
