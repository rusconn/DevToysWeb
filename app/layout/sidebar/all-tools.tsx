import { useLocation } from "react-router";

import { singleTools } from "../../config/tools";

import { ToolLink } from "./tool-link";

export function AllTools() {
  const { pathname } = useLocation();

  return (
    <ToolLink
      Icon={singleTools.allTools.Icon}
      shortTitle={singleTools.allTools.shortTitle}
      path={singleTools.allTools.path}
      highlight={pathname === singleTools.allTools.path ? "both" : "none"}
    />
  );
}
