import { fromThrowable } from "neverthrow";

export const safeEncodeURIComponent = fromThrowable(encodeURIComponent);
export const safeDecodeURIComponent = fromThrowable(decodeURIComponent);
