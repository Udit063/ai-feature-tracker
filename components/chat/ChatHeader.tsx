import { Bot, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatHeaderProps } from "@/types/chat";

export function ChatHeader({
  title = "AI Feature Tracker",
  subtitle,
  showMenu = false,
  bordered = false,
}: ChatHeaderProps) {
  return (
    <div
      className={
        bordered
          ? "flex flex-col items-center gap-1 px-6 pb-2 pt-6 text-center"
          : "flex items-center justify-between border-b border-zinc-200 px-5 py-4"
      }
    >
      <div
        className={
          bordered
            ? "flex flex-col items-center gap-3"
            : "flex items-center gap-3"
        }
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600">
          <Bot className="h-5 w-5 text-white" strokeWidth={2} />
        </div>
        <div className={bordered ? "" : undefined}>
          <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
          {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
        </div>
      </div>

      {showMenu && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
          aria-label="More options"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
