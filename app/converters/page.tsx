import { toolGroups } from "@/config/tools";
import { PageRootSection } from "@/components/page-root-section";
import { ToolCards } from "@/components/tool-cards";

export default function Page() {
  return (
    <PageRootSection title={toolGroups.converters.title}>
      <ToolCards tools={Object.values(toolGroups.converters.tools)} />
    </PageRootSection>
  );
}
