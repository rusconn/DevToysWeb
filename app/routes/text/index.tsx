import { toolGroups } from "../../config/tools";
import { PageRootSection } from "../../components/page-root-section";
import { ToolCards } from "../../components/tool-cards";

import { pageTitle } from "../../utils/title";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => [
  { title: pageTitle(toolGroups.text.title) },
  { name: "googlebot", content: "noindex" },
];

export default function Index() {
  return (
    <PageRootSection title={toolGroups.text.title}>
      <ToolCards tools={Object.values(toolGroups.text.tools)} />
    </PageRootSection>
  );
}
