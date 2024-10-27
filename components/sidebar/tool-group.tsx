"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";

import { ToolGroup as IToolGroup } from "@/config/tools";
import { cn } from "@/lib/style";
import * as icons from "@/components/icons";

import { ToolLink } from "./tool-link";

type Props = IToolGroup & {
  isOpend: boolean;
};

export function ToolGroup({ Icon, title, href, tools, isOpend }: Props) {
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const onClick = () => triggerRef.current?.click();

  return (
    <Accordion.AccordionItem value={href}>
      <Accordion.Header asChild>
        <div className="relative flex">
          <div className="flex-1">
            <ToolLink
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
          </div>
          <Accordion.Trigger
            ref={triggerRef}
            className={cn(
              "absolute right-0 flex size-10 items-center justify-center rounded transition-all duration-0",
              "hover:bg-neutral-200",
              "[&[data-state=open]>svg]:rotate-180",
              "dark:hover:bg-neutral-750"
            )}
            aria-label="toggle open/close state of the tool group"
          >
            <icons.ChevronDown className="size-4 transition-transform duration-200" />
          </Accordion.Trigger>
        </div>
      </Accordion.Header>
      <Accordion.AccordionContent
        className={cn(
          "overflow-hidden transition-all",
          "data-[state=open]:animate-accordion-down",
          "data-[state=closed]:animate-accordion-up"
        )}
      >
        <ul>
          {Object.values(tools).map(tool => (
            <li className="mt-1" key={tool.href}>
              <ToolLink
                {...tool}
                highlight={isOpend && pathname === tool.href ? "both" : "none"}
                grouped
              />
            </li>
          ))}
        </ul>
      </Accordion.AccordionContent>
    </Accordion.AccordionItem>
  );
}
