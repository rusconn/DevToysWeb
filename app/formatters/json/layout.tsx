import { ReactNode } from "react";
import { Metadata } from "next";

import { toolGroups } from "../../_config/tools";

export const metadata: Metadata = {
  title: toolGroups.formatters.tools.json.longTitle,
  description: toolGroups.formatters.tools.json.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
