import { toolGroups } from "../../config/tools";
import { PageRootSection } from "../../components/page-root-section";
import { ToolCards } from "../../components/tool-cards";

import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => [
  { title: toolGroups.formatters.title },
  { name: "googlebot", content: "noindex" },
];

export default function Index() {
  return (
    <PageRootSection title={toolGroups.formatters.title}>
      <ToolCards tools={Object.values(toolGroups.formatters.tools)} />
    </PageRootSection>
  );
}
