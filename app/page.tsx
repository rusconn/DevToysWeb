import { PageRootSection } from "./_components/page-root-section";
import { ToolCards } from "./_components/tool-cards";
import { homeTools, singleTools } from "./_config/tools";

export default function Page() {
  return (
    <PageRootSection title={singleTools.allTools.longTitle}>
      <ToolCards tools={homeTools} />
    </PageRootSection>
  );
}
