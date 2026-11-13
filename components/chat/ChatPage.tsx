"use client";

import { Chat } from "@/components/chat/Chat";
import { useChat } from "@/hooks/useChat";
import { FeatureCard } from "../features/FeatureCard";
import { useEffect, useState } from "react";
import {
  Feature as FeatureResponse,
  FeatureProposal,
  Feature,
} from "@/types/chat";
import {
  featureListSchema,
  featureSchema,
  updateFeatureSchema,
} from "@/lib/validations/feature";
import { FeatureItem } from "../features/FeatureItem";

type featureUpdate = Partial<Pick<Feature, "title" | "description" | "status">>;

export function ChatPage() {
  const { messages, sendMessage, isLoading, error } = useChat();
  const [proposal, setProposal] = useState<FeatureProposal | null>(null);
  const [features, setFeatures] = useState<FeatureResponse[]>([]);

  useEffect(() => {
    async function getFeatures() {
      try {
        const response = await fetch("/api/features");

        if (!response.ok) {
          throw new Error("Unable to fetch features");
        }

        const data = await response.json();

        const res = featureListSchema.safeParse(data.features);

        if (!res.success) {
          throw new Error("Invalid response!");
        }

        setFeatures(res.data);
      } catch (error) {
        console.error("Failed to fetch features:", error);
      }
    }

    getFeatures();
  }, []);

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
      console.error("Failed to approve feature: ", error);
    }
  }

  async function handleUpdate(id: number, updates: featureUpdate) {
    try {
      const response = await fetch(`/api/features/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update feature!");
      }

      const data = await response.json();

      const res = featureSchema.safeParse(data.feature);

      if (!res.success) {
        throw new Error("Invalid feature response from server");
      }

      setFeatures((prev) =>
        prev.map((f) => (f.id === res.data.id ? res.data : f)),
      );
    } catch (error) {
      console.error("Failed to update feature: ", error);
      throw error;
    }
  }

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`/api/features/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete feature!");
      }

      setFeatures((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Failed to delete feature: ", error);
      throw error;
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
        <div className="flex w-full max-w-md flex-col gap-3">
          {features.map((feature) => (
            <FeatureItem
              key={feature.id}
              feature={feature}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
