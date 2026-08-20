"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function FeatureCard() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Public changelog");
  const [description, setDescription] = useState(
    "Auto-generated from your latest update. Shows what changed, when it shipped, and why it matters."
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger — the compact card shown inline in the chat */}
      <DialogTrigger>
        <button
          type="button"
          className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50/40"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900">
              {title}
            </p>
            <p className="truncate text-xs text-zinc-500">{description}</p>
          </div>
        </button>
      </DialogTrigger>

      {/* Dialog — full title + description, opens on click, closes on
          overlay click / Esc / the built-in close button */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2 gap-2 sm:gap-2">
          <DialogClose>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => setOpen(false)}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}