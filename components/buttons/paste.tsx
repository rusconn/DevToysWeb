import { useCallback, useMemo } from "react";

import { icons } from "@/components/icons";

import { BaseButton, BaseButtonProps } from "./base";

export type PasteButtonProps = Omit<BaseButtonProps, "icon" | "labelText" | "onClick"> & {
  onClipboardRead: (text: string) => void;
};

export function PasteButton({ iconOnly, onClipboardRead, ...props }: PasteButtonProps) {
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

  const icon = useMemo(() => <icons.Clipboard size={16} />, []);

  return <BaseButton {...props} {...{ icon, iconOnly, onClick }} labelText="Paste" />;
}
