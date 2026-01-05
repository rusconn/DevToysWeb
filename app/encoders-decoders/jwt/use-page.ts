import { useState } from "react";

import { decode } from "./lib";

export const usePage = () => {
  const [jwt, setJwt] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  );

  const clearJwt = () => {
    setJwt("");
  };

  const { header: h, payload: p } = decode(jwt);
  const header = h.map(x => JSON.stringify(x, null, 2)).unwrapOr("");
  const payload = p.map(x => JSON.stringify(x, null, 2)).unwrapOr("");

  return {
    jwt,
    setJwt,
    clearJwt,
    header,
    payload,
  };
};
