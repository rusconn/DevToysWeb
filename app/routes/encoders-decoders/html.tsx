import { toolGroups } from "../../config/tools";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { PageRootSection } from "../../components/page-root-section";
import { PageSectionWithControl } from "../../components/page-section";
import { Textarea, type TextareaProps } from "../../components/primitives/textarea";

import { usePage } from "./+html/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => [
  { title: toolGroups.encodersDecoders.tools.html.longTitle },
  {
    name: "description",
    content: toolGroups.encodersDecoders.tools.html.description,
  },
  { name: "googlebot", content: "index" },
];

export default function Html() {
  const { fields, setFieldsByDecoded, setFieldsByEncoded, clearFields } = usePage();

  const changeFieldsByDecoded: TextareaProps["onChange"] = e => {
    setFieldsByDecoded(e.currentTarget.value);
  };
  const changeFieldsByEncoded: TextareaProps["onChange"] = e => {
    setFieldsByEncoded(e.currentTarget.value);
  };

  const clearButton = (
    <Button.Clear onClick={clearFields} iconOnly aria-label="clear decoded and encoded" />
  );

  const decodedControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setFieldsByDecoded} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setFieldsByDecoded} iconOnly aria-label="load a decoded file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={fields.decoded} />
      </ControlMenuItem>
      <ControlMenuItem>{clearButton}</ControlMenuItem>
    </ControlMenu>
  );
  const encodedControl = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setFieldsByEncoded} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setFieldsByEncoded} iconOnly aria-label="load a encoded file" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Copy text={fields.encoded} />
      </ControlMenuItem>
      <ControlMenuItem>{clearButton}</ControlMenuItem>
    </ControlMenu>
  );

  return (
    <PageRootSection title={toolGroups.encodersDecoders.tools.html.longTitle}>
      <div className="flex flex-col gap-3">
        <PageSectionWithControl title="Decoded" control={decodedControl}>
          <Textarea value={fields.decoded} onChange={changeFieldsByDecoded} rows={10} />
        </PageSectionWithControl>
        <PageSectionWithControl title="Encoded" control={encodedControl}>
          <Textarea value={fields.encoded} onChange={changeFieldsByEncoded} rows={10} />
        </PageSectionWithControl>
      </div>
    </PageRootSection>
  );
}
