import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { Accordion } from "@base-ui/react/accordion";

import { toolGroups } from "../../config/tools";

import { ToolGroup } from "./tool-group";

export function ToolGroups() {
  const { pathname } = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  useEffect(() => {
    const group = Object.values(toolGroups).find(({ path }) =>
      pathname.startsWith(`${path}/`),
    )?.path;

    if (group) {
      setExpandedGroups(prev => (prev.includes(group) ? prev : [...prev, group]));
    }
  }, [pathname]);

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
