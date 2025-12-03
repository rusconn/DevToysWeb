import type { Metadata } from "next";

import { toolGroups } from "../../_config/tools";

import ClientBoundary from "./page.client";

export const metadata: Metadata = {
  title: toolGroups.generators.tools.hash.longTitle,
  description: toolGroups.generators.tools.hash.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Page() {
  return <ClientBoundary />;
}
