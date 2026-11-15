import { useTheme } from "../../hooks/use-theme";

export function usePage() {
  const { theme, setTheme } = useTheme();

  return {
    theme,
    setTheme,
  };
}
