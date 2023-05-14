import jwt_decode from "jwt-decode";

export const decode = (token: string) => {
  let headerObj;
  let payloadObj;

  if (token.split(".").length === 3) {
    /* eslint-disable no-empty */

    try {
      headerObj = jwt_decode(token, { header: true });
    } catch {}

    try {
      payloadObj = jwt_decode(token, { header: false });
    } catch {}

    /* eslint-enable no-empty */
  }

  return { headerObj, payloadObj };
};
