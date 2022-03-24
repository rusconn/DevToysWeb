import { atom } from "recoil";

export const searchTextState = atom({
  key: "searchText",
  default: "",
});
