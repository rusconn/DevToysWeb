import { css, Theme } from "@mui/material/styles";
import { config } from "ace-builds";
import { ComponentPropsWithoutRef, memo } from "react";
import AceEditor from "react-ace";

// https://github.com/securingsincity/react-ace/issues/725
config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.14/src-min-noconflict/");
config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.14/src-min-noconflict/worker-javascript.js"
);

type Props = ComponentPropsWithoutRef<typeof AceEditor>;

const editor = (theme: Theme) => css`
  box-shadow: ${theme.shadows[1]};
`;

const StyledComponent = (props: Props) => (
  <AceEditor
    wrapEnabled
    width="auto"
    height="100%"
    theme="textmate"
    showPrintMargin={false}
    highlightActiveLine={false}
    editorProps={{ $blockScrolling: true }}
    setOptions={{ mergeUndoDeltas: false }}
    css={editor}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

export const Component = memo(StyledComponent);

export default Component;
