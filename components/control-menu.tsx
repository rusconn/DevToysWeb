import { memo, PropsWithChildren } from "react";
import equal from "react-fast-compare";

function RawControlMenu({ children }: PropsWithChildren) {
  return <menu className="flex gap-2">{children}</menu>;
}

export const ControlMenu = memo(RawControlMenu, equal);

function RawControlMenuItem({ children }: PropsWithChildren) {
  return <li>{children}</li>;
}

export const ControlMenuItem = memo(RawControlMenuItem, equal);
