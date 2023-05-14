import { memo } from "react";

function RawIndicator() {
  return <span className="inline-block h-[18px] w-[3px] rounded bg-indicator" />;
}

export const Indicator = memo(RawIndicator);
