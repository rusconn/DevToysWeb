"use client";

import { useCallback, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";

import { ToolGroup as IToolGroup } from "@/config/tools";
import { icons } from "@/components/icons";

import { ToolLink } from "./tool-link";

type Props = IToolGroup & {
  isOpend: boolean;
};

// FIXME: css outline messed up
export function ToolGroup({ Icon, title, href, tools, isOpend }: Props) {
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const onClick = useCallback(() => triggerRef.current?.click(), []);

  const chevronIcon = useMemo(
    () => <icons.ChevronDown className="h-4 w-4 transition-transform duration-200" />,
    []
  );

  return (
    <Accordion.AccordionItem value={href}>
      <Accordion.Header asChild>
        <div className="relative flex">
          <ToolLink
            className="flex-1"
            {...{ Icon, href, onClick }}
            shortTitle={title}
            highlight={
              pathname === href
                ? "both"
                : !isOpend && pathname.startsWith(`${href}/`)
                ? "indicatorOnly"
                : "none"
            }
          />
          <Accordion.Trigger
            ref={triggerRef}
            className="absolute right-0 flex h-10 w-10 items-center justify-center rounded transition-all duration-0 hover:bg-accent [&[data-state=open]>svg]:rotate-180"
            aria-label="toggle open/close state of the tool group"
          >
            {chevronIcon}
          </Accordion.Trigger>
        </div>
      </Accordion.Header>
      <Accordion.AccordionContent className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <ul>
          {Object.values(tools).map(tool => (
            <li className="mt-1" key={tool.href}>
              <ToolLink
                // -outline-offset-1: ugly hack for Chrome outlines
                className="pl-8 -outline-offset-1"
                {...tool}
                highlight={isOpend && pathname === tool.href ? "both" : "none"}
              />
            </li>
          ))}
        </ul>
      </Accordion.AccordionContent>
    </Accordion.AccordionItem>
  );
}
