import type { ReactNode } from "react";
import { Label } from "radix-ui";

import { cn } from "../_lib/style";

import { Switch, type SwitchProps } from "./primitives/switch";

type Props = Omit<SwitchProps, "id"> & {
  id: string;
  label: ReactNode;
};

export function LabeledSwitch({ id, label, ...props }: Props) {
  return (
    // reverse to apply peer style
    <div className="flex flex-row-reverse items-center">
      <Switch peer id={id} {...props} />
      <Label.Root
        className={cn(
          "cursor-pointer pr-3 leading-none", //
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        )}
        htmlFor={id}
      >
        {label}
      </Label.Root>
    </div>
  );
}
