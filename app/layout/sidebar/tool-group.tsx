import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

import { Accordion } from "@base-ui/react/accordion";

import type { ToolGroup as IToolGroup } from "../../config/tools";
import { cn } from "../../lib/style";
import * as icons from "../../components/primitives/icons";

import { ToolLink } from "./tool-link";

type Props = IToolGroup & {
  isOpend: boolean;
};

export function ToolGroup({ Icon, title, path, tools, isOpend }: Props) {
  const { pathname } = useLocation();
  const triggerRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const clickTrigger = () => triggerRef.current?.click();

  const groupHighlight = isClient
    ? pathname === path
      ? "both"
      : !isOpend && pathname.startsWith(`${path}/`)
        ? "indicatorOnly"
        : "none"
    : "none";

  return (
    <Accordion.Item value={path}>
      <Accordion.Header render={<div className="relative flex" />}>
        <div className="flex-1">
          <ToolLink
            Icon={Icon}
            path={path}
            onClick={clickTrigger}
            shortTitle={title}
            highlight={groupHighlight}
          />
        </div>
        <Accordion.Trigger
          ref={triggerRef}
          className={cn(
            "absolute right-0 flex size-10 items-center justify-center rounded transition-all duration-0",
            "hover:bg-neutral-200",
            "[&[data-panel-open]>svg]:rotate-180",
            "dark:hover:bg-neutral-750",
          )}
          aria-label="toggle open/close state of the tool group"
        >
          <icons.ChevronDown className="size-4 transition-transform duration-200" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel
        className={cn(
          "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out",
          "data-ending-style:h-0 data-starting-style:h-0",
        )}
      >
        <ul>
          {Object.values(tools).map(tool => (
            <li className="mt-1" key={tool.path}>
              <ToolLink
                {...tool}
                highlight={isClient && isOpend && pathname === tool.path ? "both" : "none"}
                grouped
              />
            </li>
          ))}
        </ul>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
