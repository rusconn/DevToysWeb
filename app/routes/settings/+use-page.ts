import { useTheme } from "../../hooks/use-theme";

export const usePage = () => {
  const { theme, setTheme } = useTheme();

  return {
    theme,
    setTheme,
  };
};
