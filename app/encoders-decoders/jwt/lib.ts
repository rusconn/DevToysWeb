import { jwtDecode } from "jwt-decode";
import { err, fromThrowable, type Result } from "neverthrow";

const safeJwtDecode = fromThrowable(jwtDecode);

export const decode = (token: string) => {
  let header: Result<unknown, unknown> = err("");
  let payload: Result<unknown, unknown> = err("");

  if (token.split(".").length === 3) {
    header = safeJwtDecode(token, { header: true });
    payload = safeJwtDecode(token, { header: false });
  }

  return { header, payload };
};
