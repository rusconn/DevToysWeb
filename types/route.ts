import { UrlObject } from "url";
import { LinkProps } from "next/link";

export type ValidHref = Exclude<LinkProps<unknown>["href"], UrlObject>;
