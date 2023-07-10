import { memo, useCallback } from "react";
import equal from "react-fast-compare";

import { icons } from "@/components/icons";

import { Base, BaseProps } from "./base";

export type CopyProps = Omit<BaseProps, "icon" | "labelText" | "onClick"> & {
  text: string;
};

function RawButton({ text, iconOnly, ...props }: CopyProps) {
  const onClick: BaseProps["onClick"] = useCallback(() => {
    navigator.clipboard.writeText(text).catch(e => {
      if (e instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(e.message);
      }
    });
  }, [text]);

  return (
    <Base {...props} icon={<icons.Copy size={16} />} {...{ iconOnly, onClick }} labelText="Copy" />
  );
}

export const Copy = memo(RawButton, equal);
