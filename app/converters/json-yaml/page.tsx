import type { Metadata } from "next";

import { toolGroups } from "../../_config/tools";

import ClientBoundary from "./page.client";

export const metadata: Metadata = {
  title: toolGroups.converters.tools.jsonYaml.longTitle,
  description: toolGroups.converters.tools.jsonYaml.description,
  robots: {
    googleBot: {
      index: true,
    },
  },
};

export default function Page() {
  return <ClientBoundary />;
}
