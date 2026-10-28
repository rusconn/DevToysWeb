import { useTheme } from "../hooks/use-theme";
import { Button } from "../components/primitives/button";
import * as icons from "../components/primitives/icons";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Button variant="theme" size="taller" onClick={toggleTheme}>
      <icons.Sun className="size-7 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <icons.Moon className="absolute size-7 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
