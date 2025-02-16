import { Metadata } from "next";

import { toolGroups } from "../_config/tools";
import { PageRootSection } from "../_components/page-root-section";
import { ToolCards } from "../_components/tool-cards";

export const metadata: Metadata = {
  title: toolGroups.converters.title,
  robots: {
    googleBot: {
      index: false,
    },
  },
};

export default function Page() {
  return (
    <PageRootSection title={toolGroups.converters.title}>
      <ToolCards tools={Object.values(toolGroups.converters.tools)} />
    </PageRootSection>
  );
}
