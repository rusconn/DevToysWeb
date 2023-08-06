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
    <div className="relative flex w-full items-center">
      <Input
        ref={inputRef}
        className="flex-1 pr-16 font-sans"
        value={text}
        onChange={changeText}
        onKeyDown={searchIfEnter}
        placeholder="Type to search for tools…"
      />
      <div className="absolute right-1 flex gap-1">
        <Button className={cn("h-6 p-0", !text && "hidden")} variant="ghost" onClick={clearText}>
          <icons.X className="p-1 text-muted-foreground" />
          <span className="sr-only">Clear search text</span>
        </Button>
        <Button className="h-6 p-0" variant="ghost" onClick={search} aria-label="search">
          <icons.Search className="-scale-x-100 p-1 text-muted-foreground" />
          <span className="sr-only">Search tools</span>
        </Button>
      </div>
    </div>
  );
}
