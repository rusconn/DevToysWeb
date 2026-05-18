import { PageRootSection } from "../components/page-root-section";

import { pageTitle } from "../utils/title";
import type { Route } from "./+types/$";

export const meta: Route.MetaFunction = () => [
  { title: pageTitle("Not Found") },
  { name: "googlebot", content: "noindex" },
];

export default function NotFound() {
  return (
    <PageRootSection title="Not Found">
      <p>Could not find requested resource</p>
    </PageRootSection>
  );
}
