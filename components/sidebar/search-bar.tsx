"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/style";
import { Button, ButtonProps } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { icons } from "@/components/icons";

export function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");

  const search = () => {
    if (text.trim()) {
      router.push(`/search?q=${text.trim()}`);
    }
  };

  const changeText: InputProps["onChange"] = ({ currentTarget }) => setText(currentTarget.value);

  const searchIfEnter: InputProps["onKeyDown"] = ({ code }) => {
    if (code === "Enter") {
      search();
    }
  };

  const clearText: ButtonProps["onClick"] = () => {
    setText("");
    inputRef.current?.focus();
  };

  const clearIcon = useMemo(() => <icons.X className="p-1 text-muted-foreground" />, []);

  const searchIcon = useMemo(
    () => <icons.Search className="-scale-x-100 p-1 text-muted-foreground" />,
    []
  );

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
          {clearIcon}
          <span className="sr-only">Clear search text</span>
        </Button>
        <Button className="h-6 p-0" variant="ghost" onClick={search} aria-label="search">
          {searchIcon}
          <span className="sr-only">Search tools</span>
        </Button>
      </div>
    </div>
  );
}
