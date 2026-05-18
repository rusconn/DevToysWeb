import { useState } from "react";

import { safeDecodeURI, safeEncodeURI } from "./lib";

export const usePage = () => {
  const [fields, setFields] = useState({
    decoded: "https://example.com/?q=foo bar",
    encoded: "https://example.com/?q=foo%20bar",
  });

  const setFieldsByDecoded = (text: string) => {
    setFields({
      decoded: text,
      encoded: text
        .split("\n")
        .map(line => safeEncodeURI(line).unwrapOr(""))
        .join("\n"),
    });
  };

  const setFieldsByEncoded = (text: string) => {
    setFields({
      decoded: safeDecodeURI(text).unwrapOr(""),
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
