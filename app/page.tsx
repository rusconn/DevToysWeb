import { homeTools, singleTools } from "@/config/tools";
import { PageRootSection } from "@/components/page-root-section";
import { ToolCards } from "@/components/tool-cards";

export default function Page() {
  return (
    <PageRootSection title={singleTools.allTools.longTitle}>
      <ToolCards tools={homeTools} />
    </PageRootSection>
  );
}
