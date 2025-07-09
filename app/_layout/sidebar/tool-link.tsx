import Link, { LinkProps } from "next/link";

import { Tool } from "../../_config/tools";
import { cn } from "../../_lib/style";
import { Indicator } from "../../_components/primitives/indicator";

import styles from "./tool-link.module.css";

type Props = Pick<Tool, "Icon" | "shortTitle"> &
  Pick<LinkProps<unknown>, "href" | "onClick"> & {
    highlight: "both" | "indicatorOnly" | "none";
    grouped?: true;
  };

// FIXME: css outline messed up
export function ToolLink({ Icon, shortTitle: title, href, onClick, highlight, grouped }: Props) {
  return (
    <Link
      className={cn(
        styles.root,
        highlight === "both" && styles["highlight-both"],
        grouped && styles.grouped,
      )}
      {...{ href, onClick }}
    >
      <span
        className={cn(
          styles["indicator-container"],
          highlight === "none" && styles["highlight-none"],
        )}
      >
        <Indicator />
      </span>
      <span className={styles["title-container"]}>
        <Icon size={16} />
        <span>{title}</span>
      </span>
    </Link>
  );
}
