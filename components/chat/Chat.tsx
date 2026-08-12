import { cn } from "@/lib/utils";
import { ChatProps } from "@/types/chat";
import { MessageList } from "./MessageList";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";

/**
 * Pure UI shell for the AI Feature Tracker widget — Header, MessageList,
 * Message, and ChatInput all live in this one file as sub-components.
 * No AI / fetch logic lives here — wire `onSend` and `messages` up to
 * your own state or API layer when you're ready.
 */
export function Chat({
  variant = "empty",
  messages = [],
  onSend,
  className,
}: ChatProps) {
  if (variant === "empty") {
    return (
      <div
        className={cn(
          "flex w-full max-w-md flex-col rounded-2xl border border-zinc-200 bg-white pb-6 shadow-sm",
          className,
        )}
      >
        <ChatHeader subtitle="👋 Hi! Tell me what you're building." bordered />
        <div className="px-6 pt-4">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-[560px] w-full max-w-md flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm",
        className,
      )}
    >
      <ChatHeader showMenu />
      <MessageList messages={messages} />
      <ChatInput onSend={onSend} bordered />
    </div>
  );
}
