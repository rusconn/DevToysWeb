"use client";

import { Panel, PanelGroup } from "react-resizable-panels";

import { toolGroups } from "../../config/tools";
import { Configuration, ConfigurationItem } from "../../components/configuration";
import * as Button from "../../components/control-buttons";
import { ControlMenu, ControlMenuItem } from "../../components/control-menu";
import { DiffEditor } from "../../components/diff-editor";
import { Editor } from "../../components/editor";
import { LabeledSwitch } from "../../components/labeled-switch";
import { PageRootSection } from "../../components/page-root-section";
import { PageSection, PageSectionWithControl } from "../../components/page-section";
import * as icons from "../../components/primitives/icons";

import { pageTitle } from "../../utils/title";
import {
  HORIZONTAL_PANEL_MAX_SIZE,
  PERSISTENCE_KEY,
  VERTICAL_PANEL_MAX_SIZE,
} from "./+diff/config";
import { PanelResizeHandle } from "./+diff/panel-resize-handle";
import { ToggleFullSize } from "./+diff/toggle-full-size";
import { usePage } from "./+diff/use-page";
import type { Route } from "./+types";

export const meta: Route.MetaFunction = () => [
  { title: pageTitle(toolGroups.text.tools.diff.longTitle) },
  {
    name: "description",
    content: toolGroups.text.tools.diff.description,
  },
  { name: "googlebot", content: "index" },
];

export default function Diff() {
  const {
    input1,
    setInput1,
    clearInput1,
    input2,
    setInput2,
    clearInput2,
    diffFullHeight,
    inlineMode,
    setInlineMode,
    diffPanelMaxSize,
    toggleFullHeight,
  } = usePage();

  const inlineModeConfig = (
    <ConfigurationItem
      icon={<icons.Rows size={24} />}
      title="Inline mode"
      control={
        <LabeledSwitch
          id="uppercase-switch"
          label={inlineMode ? "On" : "Off"}
          checked={inlineMode}
          onCheckedChange={setInlineMode}
          aria-label="toggle whether to show diff in inline mode"
        />
      }
    />
  );
  const input1Control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setInput1} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setInput1} iconOnly aria-label="load a file with old text" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={clearInput1} iconOnly aria-label="clear old text input" />
      </ControlMenuItem>
    </ControlMenu>
  );

  const input2Control = (
    <ControlMenu>
      <ControlMenuItem>
        <Button.Paste onClipboardRead={setInput2} />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.File onFileRead={setInput2} iconOnly aria-label="load a file with new text" />
      </ControlMenuItem>
      <ControlMenuItem>
        <Button.Clear onClick={clearInput2} iconOnly aria-label="clear new text input" />
      </ControlMenuItem>
    </ControlMenu>
  );

  const diffControl = (
    <ControlMenu>
      <ControlMenuItem>
        <ToggleFullSize iconOnly onClick={toggleFullHeight} expanded={diffFullHeight} />
      </ControlMenuItem>
    </ControlMenu>
  );

  const hiddenInFullHeightMode = diffFullHeight ? "hidden" : "";

  return (
    <PageRootSection className="h-full" title={toolGroups.text.tools.diff.longTitle}>
      <PageSection title="Configuration" className={hiddenInFullHeightMode}>
        <Configuration>{inlineModeConfig}</Configuration>
      </PageSection>
      <PanelGroup direction="vertical" autoSaveId={PERSISTENCE_KEY.panels.vertical}>
        <Panel maxSize={VERTICAL_PANEL_MAX_SIZE} className={hiddenInFullHeightMode}>
          <PanelGroup direction="horizontal" autoSaveId={PERSISTENCE_KEY.panels.horizontal}>
            <Panel maxSize={HORIZONTAL_PANEL_MAX_SIZE}>
              <PageSectionWithControl className="h-full" title="Old text" control={input1Control}>
                <Editor value={input1} onChange={setInput1} />
              </PageSectionWithControl>
            </Panel>
            <div className="mt-10.5">
              <PanelResizeHandle direction="vertical" />
            </div>

            <Panel maxSize={HORIZONTAL_PANEL_MAX_SIZE}>
              <PageSectionWithControl className="h-full" title="New text" control={input2Control}>
                <Editor value={input2} onChange={setInput2} />
              </PageSectionWithControl>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle
          direction="horizontal"
          {...(hiddenInFullHeightMode && { hidden: true })}
        />
        <Panel maxSize={diffPanelMaxSize}>
          <PageSectionWithControl className="h-full" title="Difference" control={diffControl}>
            <DiffEditor
              original={input1}
              modified={input2}
              options={{
                readOnly: true,
                renderSideBySide: !inlineMode,
              }}
            />
          </PageSectionWithControl>
        </Panel>
      </PanelGroup>
    </PageRootSection>
  );
}
