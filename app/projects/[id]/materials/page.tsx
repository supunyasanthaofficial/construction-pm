"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { mockProjects, mockMaterials } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { MaterialForm } from "@/components/features/materials/material-form";
import { MaterialList } from "@/components/features/materials/material-list";
import { MaterialStats } from "@/components/features/materials/material-stats";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Material } from "@/lib/types";

export default function MaterialsPage() {
  const params = useParams();
  const project = mockProjects.find((p) => p.id === params.id);
  const [materials, setMaterials] = useState<Material[]>(
    mockMaterials.filter((m) => m.projectId === params.id),
  );
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-xl font-semibold">Project not found</h2>
        <Link href="/projects" className="mt-4">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const handleAdd = (data: Omit<Material, "id">) => {
    const newMaterial: Material = {
      ...data,
      id: Date.now().toString(),
    };
    setMaterials([newMaterial, ...materials]);
  };

  const handleUpdate = (updated: Material) => {
    setMaterials(materials.map((m) => (m.id === updated.id ? updated : m)));
    setEditingMaterial(null);
  };

  const handleDelete = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Materials - ${project.name}`}
        description="Manage construction materials, quantities, and suppliers."
      >
        <div className="flex gap-3">
          <Link href={`/projects/${project.id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Project
            </Button>
          </Link>
          <MaterialForm projectId={project.id} onSubmit={handleAdd} />
        </div>
      </PageHeader>

      <MaterialStats materials={materials} />
      <MaterialList
        materials={materials}
        onDelete={handleDelete}
        onEdit={setEditingMaterial}
      />

      <MaterialForm
        projectId={project.id}
        onSubmit={handleAdd}
        onUpdate={handleUpdate}
        material={editingMaterial}
        open={!!editingMaterial}
        onOpenChange={(open) => {
          if (!open) setEditingMaterial(null);
        }}
      />
    </div>
  );
}
