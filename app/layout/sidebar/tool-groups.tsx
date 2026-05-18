import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { Accordion } from "radix-ui";

import { toolGroups } from "../../config/tools";

import { ToolGroup } from "./tool-group";

const isGroupedTool = (pathname: string) =>
  Object.values(toolGroups).some(({ path }) => pathname.startsWith(`${path}/`));

export function ToolGroups() {
  const { pathname } = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  useEffect(() => {
    if (isGroupedTool(pathname)) {
      const group = `/${pathname.split("/")[1]}`;
      setExpandedGroups(prev => Array.from(new Set([...prev, group])));
    }
  }, [pathname]);

  return (
    <Accordion.Root type="multiple" value={expandedGroups} onValueChange={setExpandedGroups}>
      <ul className="flex flex-col gap-1">
        {Object.values(toolGroups).map(group => (
          <li key={group.path}>
            <ToolGroup {...group} isOpend={expandedGroups.includes(group.path)} />
          </li>
        ))}
      </ul>
    </Accordion.Root>
  );
}
