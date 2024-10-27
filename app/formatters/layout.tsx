import { Metadata } from "next";

import { toolGroups } from "@/_config/tools";

export const metadata: Metadata = {
  title: toolGroups.formatters.title,
  robots: {
    googleBot: {
      index: false,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
