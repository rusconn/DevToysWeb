"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

const SearchTextContext = createContext("");
const SetSearchTextContext = createContext<(text: string) => void>(() => {});

export const useSearchText = () => useContext(SearchTextContext);
export const useSetSearchText = () => useContext(SetSearchTextContext);

export const SearchTextProvider = ({ children }: PropsWithChildren) => {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchTextContext.Provider value={searchText}>
      <SetSearchTextContext.Provider value={setSearchText}>
        {children}
      </SetSearchTextContext.Provider>
    </SearchTextContext.Provider>
  );
};
