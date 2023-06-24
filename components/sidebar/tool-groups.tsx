"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";

import { toolGroups } from "@/config/tools";

import { ToolGroup } from "./tool-group";

const isGroupedTool = (path: string) =>
  Object.values(toolGroups).some(({ href }) => path.startsWith(`${href}/`));

export function ToolGroups() {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  useEffect(() => {
    if (isGroupedTool(pathname)) {
      const group = `/${pathname.split("/")[1]}`;
      setExpandedGroups(prev => Array.from(new Set([...prev, group])));
    }
  }, [pathname]);

  return (
    <Accordion.Root type="multiple" value={expandedGroups} onValueChange={setExpandedGroups}>
      <ul className="space-y-1">
        {Object.values(toolGroups).map(group => (
          <li key={group.href}>
            <ToolGroup {...group} isOpend={expandedGroups.includes(group.href)} />
          </li>
        ))}
      </ul>
    </Accordion.Root>
  );
}
