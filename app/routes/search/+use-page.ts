import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import Fuse from "fuse.js";

import { homeTools } from "../../config/tools";

export const usePage = () => {
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState("");

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  const fuse = new Fuse(homeTools, { keys: ["keywords"], threshold: 0.45 });
  const keyWordsOptions = q.split(" ").map(word => ({ keywords: word }));
  const result = q
    ? fuse.search({ $or: keyWordsOptions }) //
    : homeTools.map(item => ({ item }));

  const tools = result.map(({ item }) => item);
  const title =
    tools.length === 0
      ? "No results found" //
      : q
        ? `Search results for "${q}"`
        : "All tools";

  return {
    title,
    tools,
  };
};
