import { icons } from "@/components/icons";

import { BaseButton, BaseButtonProps } from "./base";

export type ClearButtonProps = Omit<BaseButtonProps, "icon" | "labelText">;

export function ClearButton({ iconOnly, ...props }: ClearButtonProps) {
  return <BaseButton {...props} icon={<icons.X size={16} />} {...{ iconOnly }} labelText="Clear" />;
}
