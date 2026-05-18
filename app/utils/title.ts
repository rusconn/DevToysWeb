import { siteConfig } from "../config/site";

export const pageTitle = (title: string): string => {
  return title === siteConfig.name ? title : `${title} - ${siteConfig.name}`;
};
