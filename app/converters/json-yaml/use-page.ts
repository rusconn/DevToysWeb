import { useState } from "react";

import {
  convertJsonToYaml,
  convertYamlToJson,
  formatJson,
  formatYaml,
  indentations,
  type Indentation,
} from "./lib";

type Fields = {
  indentation: Indentation;
  json: string;
  yaml: string;
};

export const usePage = () => {
  const [fields, setFields] = useState<Fields>({
    indentation: indentations.two,
    json: '{\n  "foo": {\n    "bar": "baz"\n  }\n}',
    yaml: "foo:\n  bar: baz",
  });

  const setFieldsByJson = (text: string) => {
    setFields(prev => ({
      ...prev,
      json: text,
      yaml: convertJsonToYaml(text, prev.indentation).unwrapOr(""),
    }));
  };

  const setFieldsByYaml = (text: string) => {
    setFields(prev => ({
      ...prev,
      json: convertYamlToJson(text, prev.indentation).unwrapOr(""),
      yaml: text,
    }));
  };

  const clearFields = () => {
    setFields(prev => ({
      ...prev,
      json: "",
      yaml: "",
    }));
  };

  const changeIndentation = (indentation: Indentation) => {
    setFields(prev => ({
      indentation,
      json: formatJson(prev.json, indentation).unwrapOr(""),
      yaml: formatYaml(prev.yaml, indentation).unwrapOr(""),
    }));
  };

  return {
    fields,
    setFieldsByJson,
    setFieldsByYaml,
    clearFields,
    changeIndentation,
  };
};
