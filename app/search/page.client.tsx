"use client";

import Fuse from "fuse.js";

import { homeTools } from "../_config/tools";
import { useSearchText } from "../_contexts/search-text";
import { PageRootSection } from "../_components/page-root-section";
import { ToolCards } from "../_components/tool-cards";

export default function ClientBoundary() {
  // use search params in context
  const q = useSearchText();

  const fuse = new Fuse(homeTools, { keys: ["keywords"], threshold: 0.45 });
  const keyWordsOptions = q.split(" ").map(word => ({ keywords: word }));
  const result = fuse.search({ $or: keyWordsOptions });
  const tools = result.map(({ item }) => item);

  const { title, child } =
    tools.length === 0
      ? { title: "No results found", child: null }
      : { title: `Search results for "${q}"`, child: <ToolCards {...{ tools }} /> };

  return <PageRootSection {...{ title }}>{child}</PageRootSection>;
}
