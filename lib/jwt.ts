import * as O from "fp-ts/lib/Option";
import jwt_decode from "jwt-decode";

const safeJwtDecode = O.tryCatchK(jwt_decode);

export const decode = (token: string) => {
  let header: O.Option<Record<string, unknown>> = O.none;
  let payload: O.Option<unknown> = O.none;

  if (token.split(".").length === 3) {
    header = safeJwtDecode(token, { header: true });
    payload = safeJwtDecode(token, { header: false });
  }

  return { header, payload };
};
