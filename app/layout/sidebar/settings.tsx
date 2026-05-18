import { useLocation } from "react-router";

import { singleTools } from "../../config/tools";

import { ToolLink } from "./tool-link";

export function Settings() {
  const { pathname } = useLocation();

  return (
    <ToolLink
      Icon={singleTools.settings.Icon}
      shortTitle={singleTools.settings.shortTitle}
      path={singleTools.settings.path}
      highlight={pathname === singleTools.settings.path ? "both" : "none"}
    />
  );
}
