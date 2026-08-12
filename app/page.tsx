import { Chat } from "@/components/chat/Chat";
import { ChatMessage } from "@/types/chat";

const DEMO_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Show me what changed in the last release.",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Here's a summary of your last release: 3 features shipped, 2 bugs fixed, and 1 milestone marked complete.",
  },
  {
    id: "3",
    role: "user",
    content: "Which feature got the most traction?",
  },
  {
    id: "4",
    role: "assistant",
    content:
      '"Public changelog" saw the highest engagement — 42 upvotes and 12 comments since launch.',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-wrap items-start justify-center gap-8 bg-zinc-50 p-10">
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
        <Chat variant="chat" messages={DEMO_MESSAGES} />
      </div>
    </main>
  );
}
