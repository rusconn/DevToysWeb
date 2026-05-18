import { cn } from "../../lib/style";

export function Indicator() {
  return (
    <span
      className={cn(
        "inline-block h-4.5 w-0.75 rounded bg-sky-700", //
        "dark:bg-indigo-300",
      )}
    />
  );
}
