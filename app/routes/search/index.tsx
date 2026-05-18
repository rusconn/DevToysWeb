"use client";

import { PageRootSection } from "../../components/page-root-section";
import { ToolCards } from "../../components/tool-cards";

import type { Route } from "./+types";
import { usePage } from "./+use-page";

export const meta: Route.MetaFunction = () => [
  { title: "Search results" },
  { name: "googlebot", content: "noindex" },
];

export default function Index() {
  const { title, tools } = usePage();

  return (
    <PageRootSection title={title}>
      <ToolCards tools={tools} />
    </PageRootSection>
  );
}
