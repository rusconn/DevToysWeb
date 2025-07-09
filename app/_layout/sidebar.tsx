import { Separator } from "../_components/primitives/separator";

import { AllTools } from "./sidebar/all-tools";
import { SearchBar } from "./sidebar/search-bar";
import { Settings } from "./sidebar/settings";
import { ToolGroups } from "./sidebar/tool-groups";

import styles from "./sidebar.module.css";

export function Sidebar() {
  return (
    <nav className={styles.root}>
      <div className={styles["search-bar-container"]}>
        <SearchBar />
      </div>
      <div className={styles["primary-container"]}>
        <div className={styles["all-tools-container"]}>
          <AllTools />
        </div>
        <Separator />
        <div className={styles["tool-groups-container"]}>
          <ToolGroups />
        </div>
      </div>
      <Separator />
      <div className={styles["settings-container"]}>
        <Settings />
      </div>
    </nav>
  );
}
