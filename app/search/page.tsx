"use client";

import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";

import { homeTools } from "@/config/tools";
import { PageRootSection } from "@/components/page-root-section";
import { ToolCards } from "@/components/tool-cards";

export default function Page() {
  const params = useSearchParams();

  const q = params.get("q")?.trim() ?? "";

  const fuse = new Fuse(homeTools, { keys: ["keywords"], threshold: 0.45 });
  const keyWordsOptions = q.split(" ").map(word => ({ keywords: word }));
  const result = fuse.search({ $or: keyWordsOptions });
  const tools = result.map(({ item }) => item);

  const [title, child] =
    tools.length === 0
      ? ["No results found", null]
      : [`Search results for "${q}"`, <ToolCards {...{ tools }} />];

  return <PageRootSection {...{ title }}>{child}</PageRootSection>;
}
