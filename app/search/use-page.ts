import Fuse from "fuse.js";

import { homeTools } from "../_config/tools";
import { useSearchText } from "../_contexts/search-text";

export const usePage = () => {
  // TODO: use query param
  const q = useSearchText();

  const fuse = new Fuse(homeTools, { keys: ["keywords"], threshold: 0.45 });
  const keyWordsOptions = q.split(" ").map(word => ({ keywords: word }));
  const result = fuse.search({ $or: keyWordsOptions });
  const tools = result.map(({ item }) => item);
  const title = tools.length === 0 ? "No results found" : `Search results for "${q}"`;

  return {
    title,
    tools,
  };
};
