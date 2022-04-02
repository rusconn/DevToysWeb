import { v1 as uuidv1, v4 as uuidv4 } from "uuid";

export const uuid = (version: 1 | 4, hyphens: boolean, uppercase: boolean) => {
  let generated = version === 1 ? uuidv1() : uuidv4();

  if (!hyphens) {
    generated = generated.replaceAll("-", "");
  }

  if (uppercase) {
    generated = generated.toUpperCase();
  }

  return generated;
};
