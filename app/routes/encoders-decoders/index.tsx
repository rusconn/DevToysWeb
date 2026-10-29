import { toolGroups } from "../../config/tools";
import { PageRootSection } from "../../components/page-root-section";
import { ToolCards } from "../../components/tool-cards";

import { noindexMeta } from "../../utils/meta";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => {
  return noindexMeta(toolGroups.encodersDecoders.title);
};

export default function Index() {
  return (
    <PageRootSection title={toolGroups.encodersDecoders.title}>
      <ToolCards tools={Object.values(toolGroups.encodersDecoders.tools)} />
    </PageRootSection>
  );
}
