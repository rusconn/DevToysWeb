import { memo } from "react";
import equal from "react-fast-compare";

import * as icons from "@/components/icons";

import { Base, BaseProps } from "./base";

export type ClearProps = Omit<BaseProps, "icon" | "labelText">;

function RawClear({ iconOnly, ...props }: ClearProps) {
  return <Base {...props} icon={<icons.X size={16} />} {...{ iconOnly }} labelText="Clear" />;
}

export const Clear = memo(RawClear, equal);
