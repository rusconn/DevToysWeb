import { tryCatchK } from "fp-ts/lib/Option";

export const safeEncodeURIComponent = tryCatchK(encodeURIComponent);
export const safeDecodeURIComponent = tryCatchK(decodeURIComponent);
