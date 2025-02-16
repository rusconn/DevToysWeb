import { Metadata } from "next";

import { singleTools } from "../_config/tools";

import ClientBoundary from "./page.client";

export const metadata: Metadata = {
  title: singleTools.settings.longTitle,
  robots: {
    googleBot: {
      index: false,
    },
  },
};

export default function Page() {
  return <ClientBoundary />;
}
