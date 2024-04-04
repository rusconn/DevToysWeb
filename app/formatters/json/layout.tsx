import { Metadata } from "next";

import { toolGroups } from "@/config/tools";

export const metadata: Metadata = {
  title: toolGroups.formatters.tools.json.longTitle,
  description: toolGroups.formatters.tools.json.description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
