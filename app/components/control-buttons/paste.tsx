import * as icons from "../../components/primitives/icons";

import { Base, type BaseProps } from "./base";

export type PasteProps = Omit<BaseProps, "icon" | "labelText" | "onClick"> & {
  onClipboardRead: (text: string) => void;
};

export function Paste({ onClipboardRead, ...props }: PasteProps) {
  const readClipboardAsText: BaseProps["onClick"] = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onClipboardRead(text);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  return (
    <Base
      {...props}
      icon={<icons.Clipboard size={16} />}
      onClick={readClipboardAsText}
      labelText="Paste"
    />
  );
}
