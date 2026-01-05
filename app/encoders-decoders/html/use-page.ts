import { useState } from "react";
import * as html from "html-escaper";

export const usePage = () => {
  const [form, setForm] = useState({
    decoded: "<p>NUTS & MILK</p>",
    encoded: "&lt;p&gt;NUTS &amp; MILK&lt;/p&gt;",
  });

  const setFormByDecoded = (text: string) => {
    setForm({
      decoded: text,
      encoded: html.escape(text),
    });
  };

  const setFormByEncoded = (text: string) => {
    setForm({
      decoded: html.unescape(text),
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
