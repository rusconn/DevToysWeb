import type { Metadata } from "next";

import { toolGroups } from "../../_config/tools";

import ClientBoundary from "./page.client";

export const metadata: Metadata = {
  title: toolGroups.encodersDecoders.tools.url.longTitle,
  description: toolGroups.encodersDecoders.tools.url.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Page() {
  return <ClientBoundary />;
}
