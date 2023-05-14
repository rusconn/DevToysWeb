"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";

import { singleTools } from "@/config/tools";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Configuration } from "@/components/configuration";
import { Configurations } from "@/components/configurations";
import { icons } from "@/components/icons";
import { PageRootSection } from "@/components/page-root-section";
import { PageSection } from "@/components/page-section";

export default function Page() {
  const { theme = "system", setTheme } = useTheme();

  const appThemeIcon = useMemo(() => <icons.Paintbrush size={24} />, []);

  const appThemeConfig = useMemo(
    () => (
      <Configuration
        icon={appThemeIcon}
        title="App theme"
        description="Select which app theme to display"
        control={
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger
              className="w-28"
              aria-label="toggle open/close state of app theme selection"
            >
              <SelectValue placeholder={theme} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    ),
    [appThemeIcon, setTheme, theme]
  );

  return (
    <PageRootSection title={singleTools.settings.longTitle}>
      <PageSection>
        <Configurations list={[appThemeConfig]} />
      </PageSection>
    </PageRootSection>
  );
}
