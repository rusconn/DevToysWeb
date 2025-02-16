import { Metadata } from "next";

import { toolGroups } from "../_config/tools";
import { PageRootSection } from "../_components/page-root-section";
import { ToolCards } from "../_components/tool-cards";

export const metadata: Metadata = {
  title: toolGroups.generators.title,
  robots: {
    googleBot: {
      index: false,
    },
  },
};

export default function Page() {
  return (
    <PageRootSection title={toolGroups.text.title}>
      <ToolCards tools={Object.values(toolGroups.text.tools)} />
    </PageRootSection>
  );
}
