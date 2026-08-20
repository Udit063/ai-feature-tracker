import { ChatMessage, ChatResponse } from "@/types/chat";
import { useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(message: string): Promise<ChatResponse> {
    const temporaryId = crypto.randomUUID();
    setMessages([
      ...messages,
      {
        id: temporaryId,
        role: "user",
        content: message,
      },
    ]);

    setError(null);
    setIsLoading(true);

    const url = "/api/chat";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Can't able to fetch response!");

      const data = await response.json();
      const msg = data.message;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: msg,
        },
      ]);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        setMessages((prev) => prev.filter((m) => m.id !== temporaryId));
        setError(error.message);
        throw error;
      } else {
        setError("Something went wrong! Please try again later.");
        throw new Error("Something went wrong! Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { messages, sendMessage, isLoading, error };
}
