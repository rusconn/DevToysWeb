import { useState } from "react";

import { safeDecodeURIComponent, safeEncodeURIComponent } from "./lib";

export const usePage = () => {
  const [form, setForm] = useState({
    decoded: "https://example.com/?q=foo bar",
    encoded: "https%3A%2F%2Fexample.com%2F%3Fq%3Dfoo%20bar",
  });

  const setFormByDecoded = (text: string) => {
    setForm({
      decoded: text,
      encoded: safeEncodeURIComponent(text).unwrapOr(""),
    });
  };

  const setFormByEncoded = (text: string) => {
    setForm({
      decoded: safeDecodeURIComponent(text).unwrapOr(""),
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
