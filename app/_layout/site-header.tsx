import Link from "next/link";

import { siteConfig } from "../_config/site";
import * as icons from "../_components/primitives/icons";

import { ThemeToggle } from "./theme-toggle";

import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.root}>
      <div className={styles["brand-container"]}>
        <Link className={styles["site-link"]} href="/">
          {siteConfig.name}
        </Link>
        <small className={styles["site-description"]}>
          web clone of{" "}
          <a
            className={styles["devtoys-link"]}
            href={siteConfig.links.devtoys}
            target="_blank"
            rel="noreferrer"
          >
            DevToys
          </a>
        </small>
      </div>
      <div className={styles["icons-container"]}>
        <a
          className={styles["github-link"]}
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
        >
          <icons.GitHub className={styles["github-icon"]} />
          <span className={styles["sr-only"]}>GitHub</span>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
