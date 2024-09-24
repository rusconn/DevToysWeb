import { memo } from "react";

import { cn } from "@/lib/style";

function RawIndicator() {
  return (
    <span
      className={cn(
        "inline-block h-[18px] w-[3px] rounded bg-sky-700", //
        "dark:bg-indigo-300"
      )}
    />
  );
}

export const Indicator = memo(RawIndicator);
