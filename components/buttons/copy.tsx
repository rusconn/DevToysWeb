import { memo, useCallback } from "react";
import equal from "react-fast-compare";

import { icons } from "@/components/icons";

import { BaseButton, BaseButtonProps } from "./base";

export type CopyButtonProps = Omit<BaseButtonProps, "icon" | "labelText" | "onClick"> & {
  text: string;
};

function RawCopyButton({ text, iconOnly, ...props }: CopyButtonProps) {
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

export const CopyButton = memo(RawCopyButton, equal);
