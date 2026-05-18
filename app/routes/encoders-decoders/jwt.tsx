import { toolGroups } from "../../config/tools";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { Editor } from "../../components/editor";
import { PageRootSection } from "../../components/page-root-section";
import { PageSectionWithControl } from "../../components/page-section";
import { Textarea, type TextareaProps } from "../../components/primitives/textarea";

import { usePage } from "./+jwt/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => [
  { title: toolGroups.encodersDecoders.tools.jwt.longTitle },
  {
    name: "description",
    content: toolGroups.encodersDecoders.tools.jwt.description,
  },
  { name: "googlebot", content: "index" },
];

export default function Jwt() {
  const { jwt, setJwt, clearJwt, header, payload } = usePage();

  const changeJwt: TextareaProps["onChange"] = e => {
    setJwt(e.currentTarget.value);
  };

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

  const heaederControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Copy text={header} />
      </ControlMenuItem>
    </ControlMenu>
  );
  const payloadControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Copy text={payload} />
      </ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection title={toolGroups.encodersDecoders.tools.jwt.longTitle}>
      <PageSectionWithControl title="Jwt Token" control={jwtTokenControl}>
        <Textarea value={jwt} onChange={changeJwt} rows={3} />
      </PageSectionWithControl>
      <div className="flex flex-col gap-3">
        <PageSectionWithControl title="Header" control={heaederControl}>
          <Editor height={180} language="json" value={header} options={{ readOnly: true }} />
        </PageSectionWithControl>
        <PageSectionWithControl title="Payload" control={payloadControl}>
          <Editor height={180} language="json" value={payload} options={{ readOnly: true }} />
        </PageSectionWithControl>
      </div>
    </PageRootSection>
  );
}
