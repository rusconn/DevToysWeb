import { toolGroups } from "@/_config/tools";
import { PageRootSection } from "@/_components/page-root-section";
import { ToolCards } from "@/_components/tool-cards";

export default function Page() {
  return (
    <PageRootSection title={toolGroups.formatters.title}>
      <ToolCards tools={Object.values(toolGroups.formatters.tools)} />
    </PageRootSection>
  );
}
