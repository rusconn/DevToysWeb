import { useState } from "react";

import { safeDecodeURI, safeEncodeURI } from "./lib";

export const usePage = () => {
  const [form, setForm] = useState({
    decoded: "https://example.com/?q=foo bar",
    encoded: "https://example.com/?q=foo%20bar",
  });

  const setFormByDecoded = (text: string) => {
    setForm({
      decoded: text,
      encoded: safeEncodeURI(text).unwrapOr(""),
    });
  };

  const setFormByEncoded = (text: string) => {
    setForm({
      decoded: safeDecodeURI(text).unwrapOr(""),
      encoded: text,
    });
  };

  const clearForm = () => {
    setForm({
      decoded: "",
      encoded: "",
    });
  };

  return {
    form,
    setFormByDecoded,
    setFormByEncoded,
    clearForm,
  };
};
