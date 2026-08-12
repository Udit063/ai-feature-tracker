import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessageProps } from "@/types/chat";

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex items-end gap-2", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-zinc-800" : "bg-indigo-600",
        )}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5 text-white" />
        ) : (
          <Bot className="h-3.5 w-3.5 text-white" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-indigo-600 text-white"
            : "rounded-bl-sm bg-zinc-100 text-zinc-800",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
