"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { mockProjects, mockDocuments } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { DocumentForm } from "@/components/features/documents/document-form";
import { DocumentList } from "@/components/features/documents/document-list";
import { DocumentStats } from "@/components/features/documents/document-stats";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Document } from "@/lib/types";

export default function DocumentsPage() {
  const params = useParams();
  const project = mockProjects.find((p) => p.id === params.id);
  const [documents, setDocuments] = useState<Document[]>(
    mockDocuments.filter((d) => d.projectId === params.id),
  );

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-xl font-semibold">Project not found</h2>
        <Link href="/projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const handleUpload = (data: Omit<Document, "id">) => {
    const newDoc: Document = {
      ...data,
      id: Date.now().toString(),
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Documents - ${project.name}`}
        description="Upload and manage project-related files."
      >
        <div className="flex gap-3">
          <Link href={`/projects/${project.id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Project
            </Button>
          </Link>
          <DocumentForm projectId={project.id} onSubmit={handleUpload} />
        </div>
      </PageHeader>

      <DocumentStats documents={documents} />
      <DocumentList documents={documents} onDelete={handleDelete} />
    </div>
  );
}
