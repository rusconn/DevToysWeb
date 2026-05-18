import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { singleTools } from "../../config/tools";

import { ToolLink } from "./tool-link";

export function Settings() {
  const { pathname } = useLocation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const highlight =
    isClient && pathname === singleTools.settings.path //
      ? "both"
      : "none";

  return (
    <ToolLink
      Icon={singleTools.settings.Icon}
      shortTitle={singleTools.settings.shortTitle}
      path={singleTools.settings.path}
      highlight={highlight}
    />
  );
}
