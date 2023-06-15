import jwt_decode from "jwt-decode";
import { err, fromThrowable, Result } from "neverthrow";

const safeJwtDecode = fromThrowable(jwt_decode);

export const decode = (token: string) => {
  let header: Result<unknown, unknown> = err("");
  let payload: Result<unknown, unknown> = err("");

  if (token.split(".").length === 3) {
    header = safeJwtDecode(token, { header: true });
    payload = safeJwtDecode(token, { header: false });
  }

  return { header, payload };
};
