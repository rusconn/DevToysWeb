import { v1 as uuidv1, v4 as uuidv4 } from "uuid";

export const versions = {
  v1: "1",
  v4: "4",
} as const;

export type UuidVersion = (typeof versions)[keyof typeof versions];

const uuidvn = {
  "1": uuidv1,
  "4": uuidv4,
};

export const generateUuid = (version: UuidVersion, hyphens = true, uppercase = true) => {
  let generated = uuidvn[version]();

  if (!hyphens) {
    generated = generated.replaceAll("-", "");
  }

  if (uppercase) {
    generated = generated.toUpperCase();
  }

  return generated;
};

export const generateUuids = (
  count: number,
  version: UuidVersion,
  hyphens = true,
  uppercase = true,
) => {
  return Array.from({ length: count }, () => generateUuid(version, hyphens, uppercase));
};
