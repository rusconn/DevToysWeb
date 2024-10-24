import { ComponentPropsWithoutRef, useMemo } from "react";
import { PanelResizeHandle as PanelResizeHandlePrimitive } from "react-resizable-panels";

import { cn } from "@/lib/style";
import * as Icon from "@/components/icons";

type Props = {
  direction?: "vertical" | "horizontal";
} & ComponentPropsWithoutRef<typeof PanelResizeHandlePrimitive>;

export const PanelResizeHandle = ({ direction = "vertical", className, ...props }: Props) => {
  const isVertical = direction === "vertical";
  const isHorizontal = direction === "horizontal";

  const classNames = useMemo(
    () =>
      cn(
        isVertical && "w-4",
        isHorizontal && "h-4",
        "flex items-center justify-center",
        "data-[resize-handle-state=drag]:bg-neutral-200",
        "dark:data-[resize-handle-state=drag]:bg-neutral-600",
        "data-[resize-handle-state=hover]:bg-neutral-300",
        "dark:data-[resize-handle-state=hover]:bg-neutral-700",
        className
      ),
    [isVertical, isHorizontal, className]
  );

  return (
    <PanelResizeHandlePrimitive className={classNames} {...props}>
      {isVertical && <Icon.GripVertical size={12} />}
      {isHorizontal && <Icon.GripHorizontal size={12} />}
    </PanelResizeHandlePrimitive>
  );
};
