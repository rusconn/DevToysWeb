import { Metadata } from "next";

import { toolGroups } from "@/config/tools";

export const metadata: Metadata = {
  title: toolGroups.converters.tools.numberBase.longTitle,
  description: toolGroups.converters.tools.numberBase.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
