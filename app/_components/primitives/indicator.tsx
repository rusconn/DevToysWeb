import { cn } from "@/_lib/style";

export function Indicator() {
  return (
    <span
      className={cn(
        "inline-block h-[18px] w-[3px] rounded bg-sky-700", //
        "dark:bg-indigo-300"
      )}
    />
  );
}
