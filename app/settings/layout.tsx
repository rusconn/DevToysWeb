import { Metadata } from "next";

import { singleTools } from "@/config/tools";

export const metadata: Metadata = {
  title: singleTools.settings.longTitle,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
