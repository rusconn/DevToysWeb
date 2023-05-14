import { useCallback, useMemo } from "react";

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

  const icon = useMemo(() => <icons.Copy size={16} />, []);

  return <BaseButton {...props} {...{ icon, iconOnly, onClick }} labelText="Copy" />;
}
