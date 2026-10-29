import { PageRootSection } from "../components/page-root-section";

import { noindexMeta } from "../utils/meta";
import type { Route } from "./+types/$";

export const meta: Route.MetaFunction = () => {
  return noindexMeta("Not Found");
};

export default function NotFound() {
  return (
    <PageRootSection title="Not Found">
      <p>Could not find requested resource</p>
    </PageRootSection>
  );
}
