"use client";

import * as React from "react";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";

export type EditorProps = React.ComponentPropsWithRef<typeof MonacoEditor>;

/**
 * NOTE: This component maybe doesn't shrink according to the container component's width
 *
 * @see https://github.com/suren-atoyan/monaco-react/issues/346
 *
 */
export const Editor = ({ options, theme, ...props }: EditorProps) => {
  const { theme: appTheme } = useTheme();
  const themeToUse = theme ?? (appTheme === "light" ? "light" : "vs-dark");

  return (
    <MonacoEditor
      theme={themeToUse}
      options={{
        tabFocusMode: true,
        detectIndentation: false,
        minimap: { enabled: false },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        ...options, // NOTE: merge shallowly
      }}
      {...props}
    />
  );
};

Editor.displayName = "Editor";
