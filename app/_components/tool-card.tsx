import Link from "next/link";

import { Tool } from "../_config/tools";

import styles from "./tool-card.module.css";

export type ToolCardProps = Pick<Tool, "Icon" | "longTitle" | "description" | "href">;

export function ToolCard({ Icon, longTitle, description, href }: ToolCardProps) {
  return (
    <Link className={styles.link} {...{ href }}>
      <div className={styles.container}>
        <div className={styles["container-2"]}>
          <div className={styles["icon-container"]}>
            <Icon size={64} />
          </div>
        </div>
        <div className={styles["text-container"]}>
          <h2 className={styles.title}>{longTitle}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Link>
  );
}
