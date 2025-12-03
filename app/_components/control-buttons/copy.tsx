import * as icons from "../../_components/primitives/icons";

import { Base, BaseProps } from "./base";

export type CopyProps = Omit<BaseProps, "icon" | "labelText" | "onClick"> & {
  text: string;
};

export function Copy({ text, ...props }: CopyProps) {
  const writeTextToClipboard: BaseProps["onClick"] = () => {
    navigator.clipboard.writeText(text).catch((e: DOMException) => {
      alert(e.message);
    });
  };

  return (
    <Base
      {...props}
      icon={<icons.Copy size={16} />}
      onClick={writeTextToClipboard}
      labelText="Copy"
    />
  );
}
