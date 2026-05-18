import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { singleTools } from "../../config/tools";

import { ToolLink } from "./tool-link";

export function AllTools() {
  const { pathname } = useLocation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const highlight =
    isClient && pathname === singleTools.allTools.path //
      ? "both"
      : "none";

  return (
    <ToolLink
      Icon={singleTools.allTools.Icon}
      shortTitle={singleTools.allTools.shortTitle}
      path={singleTools.allTools.path}
      highlight={highlight}
    />
  );
}
