import { useCallback } from "react";

import { icons } from "@/components/icons";

import { BaseButton, BaseButtonProps } from "./base";

export type CopyButtonProps = Omit<BaseButtonProps, "icon" | "labelText" | "onClick"> & {
  text: string;
};

export function CopyButton({ text, iconOnly, ...props }: CopyButtonProps) {
  const onClick: BaseButtonProps["onClick"] = useCallback(() => {
    navigator.clipboard.writeText(text).catch(e => {
      if (e instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(e.message);
      }
    });
  }, [text]);

  return (
    <BaseButton
      {...props}
      icon={<icons.Copy size={16} />}
      {...{ iconOnly, onClick }}
      labelText="Copy"
    />
  );
}
