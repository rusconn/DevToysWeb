import { ReactNode } from "react";
import { Metadata } from "next";

import { toolGroups } from "../../_config/tools";

export const metadata: Metadata = {
  title: toolGroups.text.tools.inspector_and_case_converter.longTitle,
  description: toolGroups.text.tools.inspector_and_case_converter.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
