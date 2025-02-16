import { Metadata } from "next";

import ClientBoundary from "./page.client";

// TODO: use query param
export const metadata: Metadata = {
  title: "Search results",
  robots: {
    googleBot: {
      index: false,
    },
  },
};

export default function Page() {
  return <ClientBoundary />;
}
