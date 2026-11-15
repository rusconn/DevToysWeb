import type { MetaFunction } from "react-router";

import { siteConfig } from "../config/site";

export function indexMeta(tool: {
  longTitle: string;
  description: string;
}): NonNullable<ReturnType<MetaFunction>> {
  return [
    { title: pageTitle(tool.longTitle) },
    { name: "description", content: tool.description },
    { name: "googlebot", content: "index" },
  ];
}

export function noindexMeta(title: string): NonNullable<ReturnType<MetaFunction>> {
  return [
    { title: pageTitle(title) }, //
    { name: "googlebot", content: "noindex" },
  ];
}

function pageTitle(title: string): string {
  return title === siteConfig.name ? title : `${title} - ${siteConfig.name}`;
}
