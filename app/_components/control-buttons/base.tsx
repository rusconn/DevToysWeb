import { ReactNode } from "react";

import { Button, ButtonProps } from "../../_components/primitives/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../_components/primitives/tooltip";

export type BaseProps = Omit<ButtonProps, "variant"> & {
  icon: ReactNode;
  iconOnly?: true;
  labelText: string;
};

export function Base({ icon, iconOnly, labelText, ...props }: BaseProps) {
  const button = (
    <Button variant="control" {...props}>
      {icon}
      {!iconOnly && <span style={{ marginLeft: "0.25rem" }}>{labelText}</span>}
    </Button>
  );

  return iconOnly ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{labelText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    button
  );
}
