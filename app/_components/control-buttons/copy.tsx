import * as icons from "../../_components/primitives/icons";

import { Base, BaseProps } from "./base";

export type CopyProps = Omit<BaseProps, "icon" | "labelText" | "onClick"> & {
  text: string;
};

export function Copy({ text, iconOnly, ...props }: CopyProps) {
  const onClick: BaseProps["onClick"] = () => {
    navigator.clipboard.writeText(text).catch(e => {
      if (e instanceof Error) {
        alert(e.message);
      }
    });
  };

  return (
    <Base {...props} icon={<icons.Copy size={16} />} {...{ iconOnly, onClick }} labelText="Copy" />
  );
}
