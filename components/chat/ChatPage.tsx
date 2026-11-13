"use client";

import { Chat } from "@/components/chat/Chat";
import { useChat } from "@/hooks/useChat";
import { FeatureCard } from "./FeatureCard";
import { useState } from "react";
import { Feature as FeatureResponse, FeatureProposal } from "@/types/chat";
import { featureSchema } from "@/lib/validations/feature";

export function ChatPage() {
  const { messages, sendMessage, isLoading, error } = useChat();
  const [proposal, setProposal] = useState<FeatureProposal | null>(null);
  const [features, setFeatures] = useState<FeatureResponse[]>([]);

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

  async function handleApprove(approvedProposal: FeatureProposal) {
    try {
      const response = await fetch("/api/features", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(approvedProposal),
      });

      if (!response.ok) {
        throw new Error("Failed to create feature");
      }

      const data = await response.json();

      const res = featureSchema.safeParse(data.feature);

      // it's belong to zod and not api which had been sent by safeParse with new object containing success and data/error
      if (!res.success) {
        throw new Error("Invalid feature response from server");
      }

      setFeatures((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Failed to approve feature:", error);
    }
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
        {features.map((feature) => (
          <div key={feature.id}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <p>{feature.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
