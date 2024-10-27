import { PropsWithChildren } from "react";

export function ControlMenu({ children }: PropsWithChildren) {
  return <menu className="flex gap-2">{children}</menu>;
}

export function ControlMenuItem({ children }: PropsWithChildren) {
  return <li>{children}</li>;
}
