"use client";

import { useEffect, useState } from "react";
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
import { FeatureCardProps } from "@/types/chat";

export function FeatureCard({ proposal, onApprove }: FeatureCardProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(proposal.title);
  const [description, setDescription] = useState(proposal.description);

  // Reset the editable fields when a new proposal arrives.
  useEffect(() => {
    setTitle(proposal.title);
    setDescription(proposal.description);
  }, [proposal]);

  function handleApprove() {
    onApprove?.({
      title: title.trim(),
      description: description.trim(),
    });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
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

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>

          <DialogTitle>Edit feature proposal</DialogTitle>
          <DialogDescription>
            Review and edit the proposal before approving it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="feature-title"
              className="text-sm font-medium text-zinc-700"
            >
              Title
            </label>
            <input
              id="feature-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="feature-description"
              className="text-sm font-medium text-zinc-700"
            >
              Description
            </label>
            <textarea
              id="feature-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="w-full resize-y rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <DialogFooter className="mt-2 gap-2 sm:gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700"
            disabled={!title.trim() || !description.trim()}
            onClick={handleApprove}
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
