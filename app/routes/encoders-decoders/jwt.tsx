import { toolGroups } from "../../config/tools";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { Editor } from "../../components/editor";
import { PageRootSection } from "../../components/page-root-section";
import { PageSectionWithControl } from "../../components/page-section";
import { Textarea } from "../../components/primitives/textarea";

import { indexMeta } from "../../utils/meta";
import { usePage } from "./+jwt/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => {
  return indexMeta(toolGroups.encodersDecoders.tools.jwt);
};

export default function Jwt() {
  const { jwt, setJwt, clearJwt, header, payload } = usePage();

  const jwtTokenControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setJwt} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setJwt} iconOnly aria-label="load a token file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={clearJwt} iconOnly aria-label="clear token" />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection title={toolGroups.encodersDecoders.tools.jwt.longTitle}>
      <PageSectionWithControl title="Jwt Token" control={jwtTokenControl}>
        <Textarea value={jwt} onChange={e => setJwt(e.currentTarget.value)} rows={3} />
      </PageSectionWithControl>

      <div className="flex flex-col gap-3">
        <DecodedPartSection title="Header" value={header} />
        <DecodedPartSection title="Payload" value={payload} />
      </div>
    </PageRootSection>
  );
}

type DecodedPartSectionProps = {
  title: string;
  value: string;
};

function DecodedPartSection({ title, value }: DecodedPartSectionProps) {
  const control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Copy text={value} />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageSectionWithControl title={title} control={control}>
      <Editor height={180} language="json" value={value} options={{ readOnly: true }} />
    </PageSectionWithControl>
  );
}
