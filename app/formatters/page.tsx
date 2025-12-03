import type { Metadata } from "next";

import { toolGroups } from "../_config/tools";
import { PageRootSection } from "../_components/page-root-section";
import { ToolCards } from "../_components/tool-cards";

export const metadata: Metadata = {
  title: toolGroups.formatters.title,
  robots: {
    googleBot: {
      index: false,
    },
  },
};

export default function Page() {
  return (
    <PageRootSection title={toolGroups.formatters.title}>
      <ToolCards tools={Object.values(toolGroups.formatters.tools)} />
    </PageRootSection>
  );
}
