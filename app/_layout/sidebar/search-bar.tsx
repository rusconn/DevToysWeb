"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useSetSearchText } from "../../_contexts/search-text";
import { cn } from "../../_lib/style";
import { Button, type ButtonProps } from "../../_components/primitives/button";
import * as icons from "../../_components/primitives/icons";
import { Input, type InputProps } from "../../_components/primitives/input";

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
    <div className="relative flex items-center">
      <Input
        ref={inputRef}
        variant="search"
        value={text}
        onChange={changeText}
        onKeyDown={searchIfEnter}
        placeholder="Type to search for tools…"
      />
      <div className="absolute right-1 flex gap-1">
        <Button hidden={!text} variant="search" size="shorter" onClick={clearText}>
          <icons.X
            className={cn(
              "p-1 text-neutral-450", //
              "dark:text-neutral-400",
            )}
          />
          <span className="sr-only">Clear search text</span>
        </Button>
        <Button variant="search" size="shorter" onClick={search} aria-label="search">
          <icons.Search
            className={cn(
              "-scale-x-100 p-1 text-neutral-450", //
              "dark:text-neutral-400",
            )}
          />
          <span className="sr-only">Search tools</span>
        </Button>
      </div>
    </div>
  );
}
