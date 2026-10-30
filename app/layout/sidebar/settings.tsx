import { useMatch } from "react-router";

import { singleTools } from "../../config/tools";

import { ToolLink } from "./tool-link";

export function Settings() {
  const isActive = useMatch({
    path: singleTools.settings.path,
    end: true,
  });

  return (
    <ToolLink
      Icon={singleTools.settings.Icon}
      shortTitle={singleTools.settings.shortTitle}
      path={singleTools.settings.path}
      highlight={isActive ? "both" : "none"}
    />
  );
}
