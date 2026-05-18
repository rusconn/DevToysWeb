import { useRef, useState } from "react";
import { PrefetchPageLinks, useNavigate } from "react-router";

import { cn } from "../../lib/style";
import { Button, type ButtonProps } from "../../components/primitives/button";
import * as icons from "../../components/primitives/icons";
import { Input, type InputProps } from "../../components/primitives/input";

export function SearchBar() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [shouldPrefetch, setShouldPrefetch] = useState(false);

  const search = () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      navigate({
        pathname: "/search",
        search: `q=${encodeURIComponent(trimmedText)}`,
      });
    }
  };

  const changeText: InputProps["onChange"] = e => setText(e.currentTarget.value);

  const searchIfEnter: InputProps["onKeyDown"] = ({ code }) => {
    if (code === "Enter") {
      search();
    }
  };

  const firePrefetch = () => {
    setShouldPrefetch(true);
  };

  const clearText: ButtonProps["onClick"] = () => {
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex items-center">
      {shouldPrefetch && <PrefetchPageLinks page="/search" />}
      <Input
        ref={inputRef}
        variant="search"
        value={text}
        onChange={changeText}
        onKeyDown={searchIfEnter}
        onMouseEnter={firePrefetch}
        onFocus={firePrefetch}
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
