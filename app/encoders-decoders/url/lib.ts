import { fromThrowable } from "neverthrow";

export const safeEncodeURI = fromThrowable(encodeURI);
export const safeDecodeURI = fromThrowable(decodeURI);
