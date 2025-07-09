import { useRef } from "react";
import { usePathname } from "next/navigation";
import { Accordion } from "radix-ui";

import { ToolGroup as IToolGroup } from "../../_config/tools";
import * as icons from "../../_components/primitives/icons";

import { ToolLink } from "./tool-link";

import styles from "./tool-group.module.css";

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
        <div className={styles["header"]}>
          <div className={styles["header-2"]}>
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
            className={styles.trigger}
            aria-label="toggle open/close state of the tool group"
          >
            <icons.ChevronDown className={styles["trigger-icon"]} />
          </Accordion.Trigger>
        </div>
      </Accordion.Header>
      <Accordion.AccordionContent className={styles.content}>
        <ul>
          {Object.values(tools).map(tool => (
            <li className={styles["content-item"]} key={tool.href}>
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
