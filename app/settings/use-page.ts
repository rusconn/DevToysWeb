import { useTheme } from "next-themes";

export const usePage = () => {
  const { theme = "system", setTheme } = useTheme();

  return {
    theme,
    setTheme,
  };
};
