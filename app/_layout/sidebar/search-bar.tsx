"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useSetSearchText } from "../../_contexts/search-text";
import { Button, ButtonProps } from "../../_components/primitives/button";
import * as icons from "../../_components/primitives/icons";
import { Input, InputProps } from "../../_components/primitives/input";

import styles from "./search-bar.module.css";

export function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const setSearchText = useSetSearchText();

  // prefetch to speed up the first search
  useEffect(() => router.prefetch("/search"), [router]);

  const search = () => {
    if (text.trim()) {
      // next/navigation doesn't support shallow routing, use context instead of query params for speed
      // https://github.com/vercel/next.js/issues/49668
      setSearchText(text.trim());
      router.push("/search");
    }
  };

  const changeText: InputProps["onChange"] = e => setText(e.currentTarget.value);

  const searchIfEnter: InputProps["onKeyDown"] = ({ code }) => {
    if (code === "Enter") {
      search();
    }
  };

  const clearText: ButtonProps["onClick"] = () => {
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles["relative-container"]}>
      <Input
        ref={inputRef}
        variant="search"
        value={text}
        onChange={changeText}
        onKeyDown={searchIfEnter}
        placeholder="Type to search for tools…"
      />
      <div className={styles["absolute-container"]}>
        <Button
          {...(!text && { hidden: true })}
          variant="search"
          size="shorter"
          onClick={clearText}
        >
          <icons.X className={styles["icon-clear"]} />
          <span className={styles["sr-only"]}>Clear search text</span>
        </Button>
        <Button variant="search" size="shorter" onClick={search} aria-label="search">
          <icons.Search className={styles["icon-search"]} />
          <span className={styles["sr-only"]}>Search tools</span>
        </Button>
      </div>
    </div>
  );
}
