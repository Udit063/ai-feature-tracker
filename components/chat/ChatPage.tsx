"use client";

import { Chat } from "@/components/chat/Chat";
import { useChat } from "@/hooks/useChat";
import { FeatureCard } from "./FeatureCard";
import { useState } from "react";
import { FeatureProposal } from "@/types/chat";

export function ChatPage() {
  const { messages, sendMessage, isLoading, error } = useChat();
  const [proposal, setProposal] = useState<FeatureProposal | null>(null);

  async function handleSend(message: string) {
    try {
      const response = await sendMessage(message);

      if (response.proposal) {
        setProposal(response.proposal);
      }
    } catch {
      // useChat already stores the error.
      // Keep the previous proposal visible.
    }
  }

  function handleApprove(approvedProposal: FeatureProposal) {
    // Temporary: we'll connect this to the database later.
    console.log("Approved proposal:", approvedProposal);
  }

  return (
    <div className="flex min-h-screen flex-wrap items-start justify-center gap-8 bg-zinc-50 p-10">
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Empty state
        </span>
        <Chat variant="empty" onSend={sendMessage} isLoading={isLoading} />
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Chat state
        </span>
        <Chat
          variant="chat"
          messages={messages}
          onSend={handleSend}
          isLoading={isLoading}
        />
        {proposal && (
          <FeatureCard proposal={proposal} onApprove={handleApprove} />
        )}
      </div>
    </div>
  );
}
