import { PropsWithChildren } from "react";

export function ControlMenu({ children }: PropsWithChildren) {
  return <menu style={{ display: "flex", gap: "0.5rem" }}>{children}</menu>;
}

export function ControlMenuItem({ children }: PropsWithChildren) {
  return <li>{children}</li>;
}
