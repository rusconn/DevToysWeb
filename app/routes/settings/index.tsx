"use client";

import { singleTools } from "../../config/tools";
import type { Theme } from "../../hooks/use-theme";
import { Configuration, ConfigurationItemWithDesciption } from "../../components/configuration";
import { PageRootSection } from "../../components/page-root-section";
import * as icons from "../../components/primitives/icons";
import * as Select from "../../components/primitives/select";

import { pageTitle } from "../../utils/title";
import type { Route } from "./+types";
import { usePage } from "./+use-page";

export const meta: Route.MetaFunction = () => [
  { title: pageTitle(singleTools.settings.longTitle) },
  { name: "googlebot", content: "noindex" },
];

export default function Index() {
  const { theme, setTheme } = usePage();

  const appThemeConfig = (
    <ConfigurationItemWithDesciption
      icon={<icons.Paintbrush size={24} />}
      title="App theme"
      description="Select which app theme to display"
      control={
        <Select.Root value={theme} onValueChange={value => setTheme(value as Theme)}>
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
