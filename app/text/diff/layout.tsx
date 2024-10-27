import { PropsWithChildren } from "react";
import { Metadata } from "next";

import { toolGroups } from "@/_config/tools";

export const metadata: Metadata = {
  title: toolGroups.text.tools.diff.longTitle,
  description: toolGroups.text.tools.diff.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
