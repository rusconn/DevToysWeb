"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/style";
import { Button, ButtonProps } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { icons } from "@/components/icons";
import { useSetSearchText } from "@/contexts/search-text";

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
        className="w-full pr-16"
        value={text}
        onChange={changeText}
        onKeyDown={searchIfEnter}
        placeholder="Type to search for tools…"
      />
      <div className="absolute right-1 flex gap-1">
        <Button
          className={cn(!text && "hidden")}
          variant="ghost"
          size="shorter"
          onClick={clearText}
        >
          <icons.X className="p-1 text-muted-foreground" />
          <span className="sr-only">Clear search text</span>
        </Button>
        <Button variant="ghost" size="shorter" onClick={search} aria-label="search">
          <icons.Search className="-scale-x-100 p-1 text-muted-foreground" />
          <span className="sr-only">Search tools</span>
        </Button>
      </div>
    </div>
  );
}
