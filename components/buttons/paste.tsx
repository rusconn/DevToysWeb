import { memo, useCallback } from "react";
import equal from "react-fast-compare";

import * as icons from "@/components/icons";

import { Base, BaseProps } from "./base";

export type PasteProps = Omit<BaseProps, "icon" | "labelText" | "onClick"> & {
  onClipboardRead: (text: string) => void;
};

export function RawPaste({ iconOnly, onClipboardRead, ...props }: PasteProps) {
  const onClick: BaseProps["onClick"] = useCallback(() => {
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
    <Base
      {...props}
      icon={<icons.Clipboard size={16} />}
      {...{ iconOnly, onClick }}
      labelText="Paste"
    />
  );
}

export const Paste = memo(RawPaste, equal);
