import { ReactNode } from "react";
import { Metadata } from "next";

import { toolGroups } from "../../_config/tools";

export const metadata: Metadata = {
  title: toolGroups.converters.tools.numberBase.longTitle,
  description: toolGroups.converters.tools.numberBase.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
