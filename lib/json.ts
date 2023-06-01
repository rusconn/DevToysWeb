import { tryCatchK } from "fp-ts/lib/Option";

export const safeJsonParse = tryCatchK(JSON.parse);
