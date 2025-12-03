"use client";

import { createContext, use, useState, type PropsWithChildren } from "react";

const SearchTextContext = createContext("");
const SetSearchTextContext = createContext<(text: string) => void>(() => {});

export const useSearchText = () => use(SearchTextContext);
export const useSetSearchText = () => use(SetSearchTextContext);

export const SearchTextProvider = ({ children }: PropsWithChildren) => {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchTextContext value={searchText}>
      <SetSearchTextContext value={setSearchText}>{children}</SetSearchTextContext>
    </SearchTextContext>
  );
};
