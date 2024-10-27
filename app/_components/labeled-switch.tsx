import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/_lib/style";

import { Switch, SwitchProps } from "./primitives/switch";

type Props = Omit<SwitchProps, "id"> & {
  id: string;
  label: React.ReactNode;
};

export function LabeledSwitch({ id, label, ...props }: Props) {
  return (
    // reverse to apply peer style
    <div className="flex flex-row-reverse items-center">
      <Switch peer {...{ id }} {...props} />
      <LabelPrimitive.Root
        className={cn(
          "cursor-pointer pr-3 leading-none", //
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        )}
        htmlFor={id}
      >
        {label}
      </LabelPrimitive.Root>
    </div>
  );
}
