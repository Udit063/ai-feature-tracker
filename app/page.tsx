import { ChatPage } from "@/components/chat/ChatPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-wrap items-start justify-center gap-8 bg-zinc-50 p-10">
      <div className="flex flex-col items-center gap-3">
        <ChatPage />
      </div>
    </main>
  );
}
