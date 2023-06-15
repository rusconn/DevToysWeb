import { tryCatchK } from "fp-ts/lib/Option";
import yaml from "js-yaml";

export const safeYamlParse = tryCatchK(yaml.load);
