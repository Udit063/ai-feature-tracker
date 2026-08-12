"use client";

import { useState, type KeyboardEvent } from "react";
import { Smile, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInputProps } from "@/types/chat";

export function ChatInput({
  placeholder = "Describe the feature you're building...",
  onSend,
  bordered = false,
  className = "",
}: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        bordered ? "border-t border-zinc-200 px-4 py-3" : ""
      } ${className}`}
    >
      <div className="flex flex-1 items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2.5 transition-colors focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
        <button
          type="button"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-600"
          aria-label="Add emoji"
        >
          <Smile className="h-4 w-4" />
        </button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
        />
      </div>

      <Button
        onClick={handleSend}
        size="icon"
        className="h-10 w-10 shrink-0 rounded-full bg-indigo-600 hover:bg-indigo-700"
        aria-label="Send message"
      >
        <SendHorizontal className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
}
