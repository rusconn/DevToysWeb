import { useState } from "react";

import { md5, sha1 } from "@noble/hashes/legacy.js";
import { sha256, sha512 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";

export const usePage = () => {
  const [uppercase, setUppercase] = useState(false);
  const [input, setInput] = useState("foo");

  const clearInput = () => {
    setInput("");
  };

  const bytes = encoder.encode(input);

  const newMd5 = bytesToHex(md5(bytes));
  const newSha1 = bytesToHex(sha1(bytes));
  const newSha256 = bytesToHex(sha256(bytes));
  const newSha512 = bytesToHex(sha512(bytes));

  return {
    uppercase,
    setUppercase,
    input,
    setInput,
    clearInput,
    md5: uppercase ? newMd5.toUpperCase() : newMd5,
    sha1: uppercase ? newSha1.toUpperCase() : newSha1,
    sha256: uppercase ? newSha256.toUpperCase() : newSha256,
    sha512: uppercase ? newSha512.toUpperCase() : newSha512,
  };
};

const encoder = new TextEncoder();
