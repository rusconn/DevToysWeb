"use client";

import { useTheme } from "next-themes";

import { singleTools } from "@/config/tools";
import * as Select from "@/components/ui/select";
import { Configuration } from "@/components/configuration";
import { Configurations } from "@/components/configurations";
import * as icons from "@/components/icons";
import { PageRootSection } from "@/components/page-root-section";

export default function Page() {
  const { theme = "system", setTheme } = useTheme();

  const appThemeConfig = (
    <Configuration
      icon={<icons.Paintbrush size={24} />}
      title="App theme"
      description="Select which app theme to display"
      control={
        <Select.Root value={theme} onValueChange={setTheme}>
          <Select.Trigger
            className="w-28"
            aria-label="toggle open/close state of app theme selection"
          >
            <Select.Value placeholder={theme} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="light">Light</Select.Item>
            <Select.Item value="dark">Dark</Select.Item>
            <Select.Item value="system">System</Select.Item>
          </Select.Content>
        </Select.Root>
      }
    />
  );

  return (
    <PageRootSection title={singleTools.settings.longTitle}>
      <Configurations list={[appThemeConfig]} />
    </PageRootSection>
  );
}
