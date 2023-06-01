import { tryCatchK } from "fp-ts/lib/Option";
import YAML from "yaml";

export const safeYamlParse = tryCatchK(YAML.parse);
