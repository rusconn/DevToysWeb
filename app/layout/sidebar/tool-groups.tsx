import { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router";

import { Accordion } from "@base-ui/react/accordion";

import { toolGroups } from "../../config/tools";

import { ToolGroup } from "./tool-group";

export function ToolGroups() {
  const { pathname } = useLocation();
  const activeGroup = Object.values(toolGroups).find(({ path }) =>
    matchPath({ path: `${path}/*`, end: true }, pathname),
  )?.path;
  const [expandedGroups, setExpandedGroups] = useState<string[]>(activeGroup ? [activeGroup] : []);

  useEffect(() => {
    if (activeGroup) {
      setExpandedGroups(prev => (prev.includes(activeGroup) ? prev : [...prev, activeGroup]));
    }
  }, [activeGroup]);

  return (
    <Accordion.Root multiple value={expandedGroups} onValueChange={setExpandedGroups}>
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
