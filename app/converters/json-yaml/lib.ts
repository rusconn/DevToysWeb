import YAML from "js-yaml";
import { fromThrowable } from "neverthrow";

import { safeJsonParse } from "../../_lib/json";

export const indentations = {
  two: "2",
  four: "4",
} as const;

export type Indentation = (typeof indentations)[keyof typeof indentations];

export const convertJsonToYaml = (json: string, indentation: Indentation) => {
  const indent = Number(indentation);
  return safeJsonParse(json).map(x => YAML.dump(x, { indent, quotingType: '"' }));
};

export const formatJson = (json: string, indentation: Indentation) => {
  const indent = Number(indentation);
  return safeJsonParse(json).map(x => JSON.stringify(x, null, indent));
};

const safeYamlParse = fromThrowable(YAML.load);

export const convertYamlToJson = (yaml: string, indentation: Indentation) => {
  const indent = Number(indentation);
  return safeYamlParse(yaml).map(x => JSON.stringify(x, null, indent));
};

export const formatYaml = (yaml: string, indentation: Indentation) => {
  const indent = Number(indentation);
  return safeYamlParse(yaml).map(x => YAML.dump(x, { indent, quotingType: '"' }));
};
