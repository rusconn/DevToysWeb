import { redirect } from "react-router";

import Fuse from "fuse.js";

import { homeTools } from "../../config/tools";
import { PageRootSection } from "../../components/page-root-section";
import { ToolCards } from "../../components/tool-cards";

import { pageTitle } from "../../utils/title";
import type { Route } from "./+types";

const fuse = new Fuse(homeTools, {
  keys: ["keywords"],
  threshold: 0.45,
});

export const meta: Route.MetaFunction = () => [
  { title: pageTitle("Search results") },
  { name: "googlebot", content: "noindex" },
];

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";

  if (q === "") {
    throw redirect("/");
  }

  const keyWordsOptions = q.split(" ").map(word => ({ keywords: word }));
  const result = fuse.search({ $or: keyWordsOptions });
  const tools = result.map(({ item }) => item);
  const title =
    tools.length === 0
      ? "No results found" //
      : `Search results for "${q}"`;

  return { title, tools };
}

export function HydrateFallback() {
  return null;
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { title, tools } = loaderData;

  return (
    <PageRootSection title={title}>
      <ToolCards tools={tools} />
    </PageRootSection>
  );
}
