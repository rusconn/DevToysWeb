import { Metadata } from "next";

import { toolGroups } from "@/config/tools";

export const metadata: Metadata = {
  title: toolGroups.encodersDecoders.tools.html.longTitle,
  description: toolGroups.encodersDecoders.tools.html.description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
