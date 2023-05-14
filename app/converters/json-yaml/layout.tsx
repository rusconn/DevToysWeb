import { Metadata } from "next";

import { toolGroups } from "@/config/tools";

export const metadata: Metadata = {
  title: toolGroups.converters.tools.jsonYaml.longTitle,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
