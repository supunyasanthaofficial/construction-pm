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
import { Plus, Upload } from "lucide-react";
import type { Document } from "@/lib/types";

interface DocumentFormProps {
  projectId: string;
  onSubmit: (data: Omit<Document, "id">) => void;
}

export function DocumentForm({ projectId, onSubmit }: DocumentFormProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setIsUploading(true);
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Build mock document
    const newDoc: Omit<Document, "id"> = {
      projectId,
      name: file.name,
      filePath: `projects/${projectId}/${file.name}`, // mock path
      fileType: file.name.split(".").pop()?.toLowerCase() || "unknown",
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedBy: "Kasun Perera", // will come from auth context later
      uploadedAt: new Date().toISOString().split("T")[0],
    };

    onSubmit(newDoc);
    setIsUploading(false);
    setOpen(false);
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Select a file to upload for this project.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="file">File *</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {file && (
              <p className="text-sm text-slate-500">
                Selected: {file.name} ({(file.size / 1024).toFixed(0)} KB)
              </p>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {isUploading ? (
                "Uploading..."
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
