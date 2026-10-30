import { type SubmitEventHandler, useRef, useState } from "react";
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

  const submitSearch: SubmitEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    navigate({
      pathname: "/search",
      search: `q=${encodeURIComponent(text.trim())}`,
    });
  };

  const changeText: InputProps["onChange"] = e => setText(e.currentTarget.value);

  const firePrefetch = () => {
    setShouldPrefetch(true);
  };

  const clearText: ButtonProps["onClick"] = () => {
    setText("");
    inputRef.current?.focus();
  };

  return (
    <form className="relative flex items-center" aria-label="Tool search" onSubmit={submitSearch}>
      {shouldPrefetch && <PrefetchPageLinks page="/search" />}
      <Input
        ref={inputRef}
        variant="search"
        type="search"
        name="q"
        enterKeyHint="search"
        autoComplete="off"
        value={text}
        onChange={changeText}
        onMouseEnter={firePrefetch}
        onFocus={firePrefetch}
        placeholder="Type to search for tools…"
      />
      <div className="absolute right-1 flex gap-1">
        <Button hidden={!text} variant="search" size="shorter" onClick={clearText}>
          <icons.X
            className={cn(
              "text-neutral-450 p-1", //
              "dark:text-neutral-400",
            )}
          />
          <span className="sr-only">Clear search text</span>
        </Button>
        <Button type="submit" variant="search" size="shorter">
          <icons.Search
            className={cn(
              "text-neutral-450 -scale-x-100 p-1", //
              "dark:text-neutral-400",
            )}
          />
          <span className="sr-only">Search tools</span>
        </Button>
      </div>
    </form>
  );
}
