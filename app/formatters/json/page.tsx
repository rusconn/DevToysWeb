import type { Metadata } from "next";

import { toolGroups } from "../../_config/tools";

import ClientBoundary from "./page.client";

export const metadata: Metadata = {
  title: toolGroups.formatters.tools.json.longTitle,
  description: toolGroups.formatters.tools.json.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Page() {
  return <ClientBoundary />;
}
