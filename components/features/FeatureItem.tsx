"use client";

import { useState } from "react";
import { Pencil, Check, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Feature } from "@/types/chat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type FeatureUpdate = Partial<Pick<Feature, "title" | "description" | "status">>;

type FeatureItemProps = {
  feature: Feature;
  onUpdate: (id: number, updates: FeatureUpdate) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export function FeatureItem({ feature, onUpdate, onDelete }: FeatureItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(feature.title);
  const [description, setDescription] = useState(feature.description ?? "");
  const [status, setStatus] = useState(feature.status);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function handleSave() {
    setIsSaving(true);

    try {
      await onUpdate(feature.id, {
        title: title.trim(),
        description: description.trim(),
        status,
      });

      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);

    try {
      await onDelete(feature.id);
      setDeleteDialogOpen(false);
    } finally {
      setIsDeleting(false);
    }
  }

  function handleCancel() {
    setTitle(feature.title);
    setDescription(feature.description ?? "");
    setStatus(feature.status);
    setIsEditing(false);
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      {isEditing ? (
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Feature title"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full resize-y rounded-md border px-3 py-2 text-sm"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="upcoming">Upcoming</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>

            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !title.trim()}
            >
              <Check className="mr-1 h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2">
            <h3 className="font-semibold text-zinc-900">{feature.title}</h3>

            <p className="text-sm text-zinc-500">{feature.description}</p>

            <span className="inline-block rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
              {feature.status.replace("_", " ")}
            </span>
          </div>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              disabled={isDeleting}
              aria-label="Edit feature"
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isDeleting}
                  aria-label="Delete feature"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete feature?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete "{feature.title}"? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose>
                    <Button variant="outline" disabled={isDeleting}>
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}
