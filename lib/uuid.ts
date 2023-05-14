import { v1 as uuidv1, v4 as uuidv4 } from "uuid";

const uuidvn = {
  1: uuidv1,
  4: uuidv4,
};

export const uuid = (version: 1 | 4 | "1" | "4", hyphens = true, uppercase = true) => {
  let generated = uuidvn[version]();

  if (!hyphens) {
    generated = generated.replaceAll("-", "");
  }

  if (uppercase) {
    generated = generated.toUpperCase();
  }

  return generated;
};
