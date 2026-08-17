"use client";

import { Chat } from "@/components/chat/Chat";
import { useChat } from "@/hooks/useChat";

export function ChatPage(){
    const {messages, sendMessage, isLoading, error} = useChat();

  return (
    <div className="flex min-h-screen flex-wrap items-start justify-center gap-8 bg-zinc-50 p-10">
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Empty state
        </span>
        <Chat variant="empty" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Chat state
        </span>
        <Chat variant="chat" messages={messages} />
      </div>
    </div>
  );
}
