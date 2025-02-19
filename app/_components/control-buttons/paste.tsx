import * as icons from "../../_components/primitives/icons";

import { Base, BaseProps } from "./base";

export type PasteProps = Omit<BaseProps, "icon" | "labelText" | "onClick"> & {
  onClipboardRead: (text: string) => void;
};

export function Paste({ iconOnly, onClipboardRead, ...props }: PasteProps) {
  const onClick: BaseProps["onClick"] = () => {
    navigator.clipboard
      .readText()
      .then(onClipboardRead)
      .catch(e => {
        if (e instanceof Error) {
          alert(e.message);
        }
      });
  };

  return (
    <Base
      {...props}
      icon={<icons.Clipboard size={16} />}
      {...{ iconOnly, onClick }}
      labelText="Paste"
    />
  );
}
