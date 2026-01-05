import { useState } from "react";
import MD5 from "crypto-js/md5";
import SHA1 from "crypto-js/sha1";
import SHA256 from "crypto-js/sha256";
import SHA512 from "crypto-js/sha512";

export const usePage = () => {
  const [uppercase, setUppercase] = useState(false);
  const [input, setInput] = useState("foo");

  const clearInput = () => {
    setInput("");
  };

  const newMd5 = MD5(input).toString();
  const newSha1 = SHA1(input).toString();
  const newSha256 = SHA256(input).toString();
  const newSha512 = SHA512(input).toString();

  const md5 = uppercase ? newMd5.toUpperCase() : newMd5;
  const sha1 = uppercase ? newSha1.toUpperCase() : newSha1;
  const sha256 = uppercase ? newSha256.toUpperCase() : newSha256;
  const sha512 = uppercase ? newSha512.toUpperCase() : newSha512;

  return {
    uppercase,
    setUppercase,
    input,
    setInput,
    clearInput,
    md5,
    sha1,
    sha256,
    sha512,
  };
};
