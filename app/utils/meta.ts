import type { MetaFunction } from "react-router";

import { siteConfig } from "../config/site";

export const indexMeta = (tool: {
  longTitle: string;
  description: string;
}): NonNullable<ReturnType<MetaFunction>> => [
  { title: pageTitle(tool.longTitle) },
  { name: "description", content: tool.description },
  { name: "googlebot", content: "index" },
];

export const noindexMeta = (title: string): NonNullable<ReturnType<MetaFunction>> => [
  { title: pageTitle(title) },
  { name: "googlebot", content: "noindex" },
];

const pageTitle = (title: string): string => {
  return title === siteConfig.name ? title : `${title} - ${siteConfig.name}`;
};
