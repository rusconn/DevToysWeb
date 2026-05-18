import { toolGroups } from "../../config/tools";
import { PageRootSection } from "../../components/page-root-section";
import { ToolCards } from "../../components/tool-cards";

import { pageTitle } from "../../utils/title";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => [
  { title: pageTitle(toolGroups.encodersDecoders.title) },
  { name: "googlebot", content: "noindex" },
];

export default function Index() {
  return (
    <PageRootSection title={toolGroups.encodersDecoders.title}>
      <ToolCards tools={Object.values(toolGroups.encodersDecoders.tools)} />
    </PageRootSection>
  );
}
