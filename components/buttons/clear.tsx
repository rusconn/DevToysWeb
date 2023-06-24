import { memo } from "react";
import equal from "react-fast-compare";

import { icons } from "@/components/icons";

import { BaseButton, BaseButtonProps } from "./base";

export type ClearButtonProps = Omit<BaseButtonProps, "icon" | "labelText">;

function RawClearButton({ iconOnly, ...props }: ClearButtonProps) {
  return <BaseButton {...props} icon={<icons.X size={16} />} {...{ iconOnly }} labelText="Clear" />;
}

export const ClearButton = memo(RawClearButton, equal);
