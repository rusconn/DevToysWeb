import { Metadata } from "next";

import { toolGroups } from "@/config/tools";

export const metadata: Metadata = {
  title: toolGroups.encodersDecoders.tools.base64.longTitle,
  description: toolGroups.encodersDecoders.tools.base64.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
