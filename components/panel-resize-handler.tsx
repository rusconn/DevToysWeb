import { ComponentPropsWithoutRef } from "react";
import { PanelResizeHandle as PanelResizeHandlePrimitive } from "react-resizable-panels";

import { cn } from "@/lib/style";
import * as Icon from "@/components/icons";

type Props = {
  direction?: "vertical" | "horizontal";
  hidden?: true;
} & Omit<ComponentPropsWithoutRef<typeof PanelResizeHandlePrimitive>, "className">;

export const PanelResizeHandle = ({ direction = "vertical", hidden, ...props }: Props) => {
  const isVertical = direction === "vertical";
  const isHorizontal = direction === "horizontal";

  return (
    <PanelResizeHandlePrimitive
      className={cn(
        isVertical && "h-full w-4",
        isHorizontal && "h-4 w-full",
        hidden && "hidden",
        "flex items-center justify-center",
        "data-[resize-handle-state=drag]:bg-neutral-200",
        "dark:data-[resize-handle-state=drag]:bg-neutral-600",
        "data-[resize-handle-state=hover]:bg-neutral-300",
        "dark:data-[resize-handle-state=hover]:bg-neutral-700"
      )}
      {...props}
    >
      {isVertical && <Icon.GripVertical size={12} />}
      {isHorizontal && <Icon.GripHorizontal size={12} />}
    </PanelResizeHandlePrimitive>
  );
};
