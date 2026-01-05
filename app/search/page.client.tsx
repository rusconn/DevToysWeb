"use client";

import { PageRootSection } from "../_components/page-root-section";
import { ToolCards } from "../_components/tool-cards";

import { usePage } from "./use-page";

export default function ClientBoundary() {
  const { title, tools } = usePage();

  return (
    <PageRootSection title={title}>
      <ToolCards tools={tools} />
    </PageRootSection>
  );
}
