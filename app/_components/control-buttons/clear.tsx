import * as icons from "../../_components/primitives/icons";

import { Base, BaseProps } from "./base";

export type ClearProps = Omit<BaseProps, "icon" | "labelText">;

export function Clear({ iconOnly, ...props }: ClearProps) {
  return <Base {...props} icon={<icons.X size={16} />} {...{ iconOnly }} labelText="Clear" />;
}
