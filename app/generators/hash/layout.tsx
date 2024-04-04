import { Metadata } from "next";

import { toolGroups } from "@/config/tools";

export const metadata: Metadata = {
  title: toolGroups.generators.tools.hash.longTitle,
  description: toolGroups.generators.tools.hash.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
