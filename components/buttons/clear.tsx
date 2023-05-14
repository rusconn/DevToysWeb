import { useMemo } from "react";

import { icons } from "@/components/icons";

import { BaseButton, BaseButtonProps } from "./base";

export type ClearButtonProps = Omit<BaseButtonProps, "icon" | "labelText">;

export function ClearButton({ iconOnly, ...props }: ClearButtonProps) {
  const icon = useMemo(() => <icons.X size={16} />, []);

  return <BaseButton {...props} {...{ icon, iconOnly }} labelText="Clear" />;
}
