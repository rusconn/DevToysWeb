import { Metadata } from "next";

import { singleTools } from "@/_config/tools";

export const metadata: Metadata = {
  title: singleTools.settings.longTitle,
  robots: {
    googleBot: {
      index: false,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
