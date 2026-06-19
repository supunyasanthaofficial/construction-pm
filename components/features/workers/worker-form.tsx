"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Worker } from "@/lib/types";
import { Plus } from "lucide-react";

interface WorkerFormProps {
  projectId: string;
  onSubmit: (data: Omit<Worker, "id">) => void;
  onUpdate?: (data: Worker) => void;
  worker?: Worker | null;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function WorkerForm({
  projectId,
  onSubmit,
  onUpdate,
  worker,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: WorkerFormProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange ?? setInternalOpen;
  const dialogKey = worker?.id ?? "new";

  const [formData, setFormData] = useState({
    fullName: worker?.fullName ?? "",
    role: worker?.role ?? "",
    dailyWage: worker ? worker.dailyWage.toString() : "",
    phone: worker?.phone ?? "",
  });

  const isEditMode = !!worker;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.role || !formData.dailyWage) return;

    await new Promise((resolve) => setTimeout(resolve, 500));

    const data = {
      projectId,
      fullName: formData.fullName,
      role: formData.role,
      dailyWage: parseFloat(formData.dailyWage) || 0,
      phone: formData.phone,
    };

    if (isEditMode && onUpdate && worker) {
      onUpdate({ ...worker, ...data });
    } else {
      onSubmit(data);
    }
    setOpen(false);
  };

  return (
    <Dialog key={dialogKey} open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Worker
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Worker" : "Add New Worker"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update worker details."
              : "Register a new worker for this project."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
              className="focus-visible:ring-orange-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                placeholder="e.g., Mason"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dailyWage">Daily Wage (Rs) *</Label>
              <Input
                id="dailyWage"
                type="number"
                value={formData.dailyWage}
                onChange={(e) =>
                  setFormData({ ...formData, dailyWage: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="0771234567"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="submit"
              disabled={
                !formData.fullName || !formData.role || !formData.dailyWage
              }
              className="bg-orange-500 hover:bg-orange-600"
            >
              {isEditMode ? "Update Worker" : "Add Worker"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
