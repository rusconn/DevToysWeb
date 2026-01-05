import { useState } from "react";
import * as html from "html-escaper";

export const usePage = () => {
  const [fields, setFields] = useState({
    decoded: "<p>NUTS & MILK</p>",
    encoded: "&lt;p&gt;NUTS &amp; MILK&lt;/p&gt;",
  });

  const setFieldsByDecoded = (text: string) => {
    setFields({
      decoded: text,
      encoded: html.escape(text),
    });
  };

  const setFieldsByEncoded = (text: string) => {
    setFields({
      decoded: html.unescape(text),
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
