import React from "react";

import { generateUuids, type UuidVersion } from "./lib";
import { useAutoScroll } from "./use-auto-scroll";

export const usePage = () => {
  const [hyphens, setHyphens] = React.useState(true);
  const [uppercase, setUppercase] = React.useState(false);
  const [uuidVersion, setUuidVersion] = React.useState<UuidVersion>("4");
  const [generates, setGenerates] = React.useState(1);
  const [uuids, setUuids] = React.useState<string[]>([]);

  const generate = () => {
    setUuids(uuids => [...uuids, ...generateUuids(generates, uuidVersion, hyphens, uppercase)]);
  };

  const clearUuids = () => {
    setUuids([]);
  };

  const uuidsRef = useAutoScroll<HTMLTextAreaElement>([uuids]);

  return {
    hyphens,
    setHyphens,
    uppercase,
    setUppercase,
    uuidVersion,
    setUuidVersion,
    generate,
    generates,
    setGenerates,
    uuids,
    clearUuids,
    uuidsRef,
  };
};
