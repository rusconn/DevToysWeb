import yaml from "js-yaml";
import { fromThrowable } from "neverthrow";

export const safeYamlParse = fromThrowable(yaml.load);
