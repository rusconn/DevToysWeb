import { toolGroups } from "@/config/tools";
import { PageRootSection } from "@/components/page-root-section";
import { ToolCards } from "@/components/tool-cards";

export default function Page() {
  return (
    <PageRootSection title={toolGroups.formatters.title}>
      <ToolCards tools={Object.values(toolGroups.formatters.tools)} />
    </PageRootSection>
  );
}
