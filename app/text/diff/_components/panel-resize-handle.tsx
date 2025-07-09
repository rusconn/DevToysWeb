import { ComponentPropsWithoutRef } from "react";
import { PanelResizeHandle as PanelResizeHandlePrimitive } from "react-resizable-panels";

import { cn } from "../../../_lib/style";
import * as Icon from "../../../_components/primitives/icons";

import styles from "./panel-resize-handle.module.css";

type Props = {
  direction?: keyof typeof directions;
  hidden?: true;
} & Omit<ComponentPropsWithoutRef<typeof PanelResizeHandlePrimitive>, "className">;

export const PanelResizeHandle = ({ direction = "vertical", hidden, ...props }: Props) => {
  const isVertical = direction === "vertical";
  const isHorizontal = direction === "horizontal";

  return (
    <PanelResizeHandlePrimitive
      className={cn(styles.root, directions[direction], hidden && styles.hidden)}
      {...props}
    >
      {isVertical && <Icon.GripVertical size={12} />}
      {isHorizontal && <Icon.GripHorizontal size={12} />}
    </PanelResizeHandlePrimitive>
  );
};

const directions = {
  vertical: styles["direction-vertical"],
  horizontal: styles["direction-horizontal"],
};
