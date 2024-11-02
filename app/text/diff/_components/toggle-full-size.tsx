import * as Icon from "../../../_components/primitives/icons";
import { Base, BaseProps } from "../../../_components/control-buttons/base";

export type ToggleFullSizeProps = Omit<BaseProps, "icon" | "labelText"> & {
  expanded: boolean;
};

export function ToggleFullSize({ expanded, ...props }: ToggleFullSizeProps) {
  return (
    <Base
      {...props}
      icon={expanded ? <Icon.Minimize size={16} /> : <Icon.Maximize size={16} />}
      labelText={expanded ? "Collapse" : "Expand"}
    />
  );
}
