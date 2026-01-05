import { useState } from "react";

import {
  convertJsonToYaml,
  convertYamlToJson,
  formatJson,
  formatYaml,
  indentations,
  type Indentation,
} from "./lib";

type FormState = {
  indentation: Indentation;
  json: string;
  yaml: string;
};

export const usePage = () => {
  const [form, setForm] = useState<FormState>({
    indentation: indentations.two,
    json: '{\n  "foo": {\n    "bar": "baz"\n  }\n}',
    yaml: "foo:\n  bar: baz",
  });

  const setFormByJson = (text: string) => {
    setForm(prev => ({
      ...prev,
      json: text,
      yaml: convertJsonToYaml(text, prev.indentation).unwrapOr(""),
    }));
  };

  const setFormByYaml = (text: string) => {
    setForm(prev => ({
      ...prev,
      json: convertYamlToJson(text, prev.indentation).unwrapOr(""),
      yaml: text,
    }));
  };

  const clearForm = () => {
    setForm(prev => ({
      ...prev,
      json: "",
      yaml: "",
    }));
  };

  const changeIndentation = (indentation: Indentation) => {
    setForm(prev => ({
      indentation,
      json: formatJson(prev.json, indentation).unwrapOr(""),
      yaml: formatYaml(prev.yaml, indentation).unwrapOr(""),
    }));
  };

  return {
    form,
    setFormByJson,
    setFormByYaml,
    clearForm,
    changeIndentation,
  };
};
