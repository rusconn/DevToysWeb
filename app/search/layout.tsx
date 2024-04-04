import { Metadata } from "next";

// TODO: use query param
export const metadata: Metadata = {
  title: "Search results",
  robots: {
    googleBot: {
      index: false,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
