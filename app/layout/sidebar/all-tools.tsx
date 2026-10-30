import { useMatch } from "react-router";

import { singleTools } from "../../config/tools";

import { ToolLink } from "./tool-link";

export function AllTools() {
  const isActive = useMatch({
    path: singleTools.allTools.path,
    end: true,
  });

  return (
    <ToolLink
      Icon={singleTools.allTools.Icon}
      shortTitle={singleTools.allTools.shortTitle}
      path={singleTools.allTools.path}
      highlight={isActive ? "both" : "none"}
    />
  );
}
