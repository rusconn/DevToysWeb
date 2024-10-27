import { Metadata } from "next";

import { toolGroups } from "@/_config/tools";

export const metadata: Metadata = {
  title: toolGroups.generators.tools.uuid.longTitle,
  description: toolGroups.generators.tools.uuid.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
