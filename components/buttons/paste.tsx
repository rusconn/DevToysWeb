import { memo, useCallback } from "react";
import equal from "react-fast-compare";

import { icons } from "@/components/icons";

import { BaseButton, BaseButtonProps } from "./base";

export type PasteButtonProps = Omit<BaseButtonProps, "icon" | "labelText" | "onClick"> & {
  onClipboardRead: (text: string) => void;
};

export function RawPasteButton({ iconOnly, onClipboardRead, ...props }: PasteButtonProps) {
  const onClick: BaseButtonProps["onClick"] = useCallback(() => {
    navigator.clipboard
      .readText()
      .then(onClipboardRead)
      .catch(e => {
        if (e instanceof Error) {
          // eslint-disable-next-line no-alert
          alert(e.message);
        }
      });
  }, [onClipboardRead]);

  return (
    <BaseButton
      {...props}
      icon={<icons.Clipboard size={16} />}
      {...{ iconOnly, onClick }}
      labelText="Paste"
    />
  );
}

export const PasteButton = memo(RawPasteButton, equal);
