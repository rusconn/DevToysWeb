import { useState } from "react";

import { decode, encode } from "./lib";

export const usePage = () => {
  const [form, setForm] = useState({
    decoded: "internet",
    encoded: "aW50ZXJuZXQ=",
  });

  const setFormByDecoded = (text: string) => {
    setForm({
      decoded: text,
      encoded: encode(text),
    });
  };

  const setFormByEncoded = (text: string) => {
    setForm({
      decoded: decode(text) ?? "",
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
