import { fromThrowable } from "neverthrow";

export const safeJsonParse = fromThrowable(JSON.parse);
