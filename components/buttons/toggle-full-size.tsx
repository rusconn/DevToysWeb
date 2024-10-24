import { memo } from "react";
import equal from "react-fast-compare";

import * as Icon from "@/components/icons";

import { Base, BaseProps } from "./base";

export type ToggleFullSizeProps = Omit<BaseProps, "icon" | "labelText"> & {
  expanded: boolean;
};

function RawToggleFullSize({ expanded, ...props }: ToggleFullSizeProps) {
  return (
    <Base
      {...props}
      icon={expanded ? <Icon.Minimize size={16} /> : <Icon.Maximize size={16} />}
      labelText={expanded ? "Collapse" : "Expand"}
    />
  );
}

export const ToggleFullSize = memo(RawToggleFullSize, equal);
