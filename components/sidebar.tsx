import { Separator } from "@/components/ui/separator";

import { AllTools } from "./sidebar/all-tools";
import { SearchBar } from "./sidebar/search-bar";
import { Settings } from "./sidebar/settings";
import { ToolGroups } from "./sidebar/tool-groups";

export function Sidebar() {
  return (
    <nav className="flex flex-col overflow-y-auto">
      <div className="mt-px px-4">
        <SearchBar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mt-2 p-2">
          <AllTools />
        </div>
        <Separator />
        <div className="p-2">
          <ToolGroups />
        </div>
      </div>
      <Separator />
      <div className="p-2">
        <Settings />
      </div>
    </nav>
  );
}
