"use client";

import { useTheme } from "next-themes";

import { singleTools } from "../_config/tools";
import * as icons from "../_components/primitives/icons";
import * as Select from "../_components/primitives/select";
import { Configuration, ConfigurationItem } from "../_components/configuration";
import { PageRootSection } from "../_components/page-root-section";

export default function ClientBoundary() {
  const { theme = "system", setTheme } = useTheme();

  const appThemeConfig = (
    <ConfigurationItem
      icon={<icons.Paintbrush size={24} />}
      title="App theme"
      description="Select which app theme to display"
      control={
        <Select.Root value={theme} onValueChange={setTheme}>
          <Select.Trigger aria-label="toggle open/close state of app theme selection">
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
      <Configuration>{appThemeConfig}</Configuration>
    </PageRootSection>
  );
}
