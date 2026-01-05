import { useState } from "react";

import { decode, encode } from "./lib";

export const usePage = () => {
  const [fields, setFields] = useState({
    decoded: "internet",
    encoded: "aW50ZXJuZXQ=",
  });

  const setFieldsByDecoded = (text: string) => {
    setFields({
      decoded: text,
      encoded: encode(text),
    });
  };

  const setFieldsByEncoded = (text: string) => {
    setFields({
      decoded: decode(text) ?? "",
      encoded: text,
    });
  };

  const clearFields = () => {
    setFields({
      decoded: "",
      encoded: "",
    });
  };

  return {
    fields,
    setFieldsByDecoded,
    setFieldsByEncoded,
    clearFields,
  };
};
