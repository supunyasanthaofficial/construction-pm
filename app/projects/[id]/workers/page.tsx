"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { mockProjects, mockWorkers, mockAttendance } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { WorkerForm } from "@/components/features/workers/worker-form";
import { WorkerList } from "@/components/features/workers/worker-list";
import { AttendanceMarker } from "@/components/features/workers/attendance-marker";
import { AttendanceSummary } from "@/components/features/workers/attendance-summary";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, CalendarCheck, BarChart3 } from "lucide-react";
import type { Worker, Attendance } from "@/lib/types";

export default function WorkersPage() {
  const params = useParams();
  const project = mockProjects.find((p) => p.id === params.id);
  const [workers, setWorkers] = useState<Worker[]>(
    mockWorkers.filter((w) => w.projectId === params.id),
  );
  const [attendance, setAttendance] = useState<Attendance[]>(
    mockAttendance.filter((a) => a.projectId === params.id),
  );
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);

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

  const handleAddWorker = (data: Omit<Worker, "id">) => {
    const newWorker: Worker = { ...data, id: Date.now().toString() };
    setWorkers([...workers, newWorker]);
  };

  const handleUpdateWorker = (updated: Worker) => {
    setWorkers(workers.map((w) => (w.id === updated.id ? updated : w)));
    setEditingWorker(null);
  };

  const handleDeleteWorker = (id: string) => {
    setWorkers(workers.filter((w) => w.id !== id));
    setAttendance(attendance.filter((a) => a.workerId !== id)); // remove associated attendance
  };

  const handleAttendanceSave = (records: Omit<Attendance, "id">[]) => {
    // Remove existing records for that date and project, then add new ones
    const date = records[0]?.date;
    if (!date) return;
    const withoutOld = attendance.filter(
      (a) => !(a.projectId === project.id && a.date === date),
    );
    const newRecords = records.map((r) => ({
      ...r,
      id: `${r.workerId}-${date}`,
    }));
    setAttendance([...withoutOld, ...newRecords]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Workers - ${project.name}`}
        description="Manage workers and record daily attendance."
      >
        <div className="flex gap-3">
          <Link href={`/projects/${project.id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Project
            </Button>
          </Link>
          <WorkerForm projectId={project.id} onSubmit={handleAddWorker} />
        </div>
      </PageHeader>

      <Tabs defaultValue="workers">
        <TabsList className="bg-white border rounded-lg p-1">
          <TabsTrigger value="workers" className="gap-2">
            <Users className="h-4 w-4" /> Workers
          </TabsTrigger>
          <TabsTrigger value="attendance" className="gap-2">
            <CalendarCheck className="h-4 w-4" /> Mark Attendance
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <BarChart3 className="h-4 w-4" /> Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workers" className="mt-4">
          <WorkerList
            workers={workers}
            onEdit={setEditingWorker}
            onDelete={handleDeleteWorker}
          />
        </TabsContent>

        <TabsContent value="attendance" className="mt-4">
          <AttendanceMarker
            workers={workers}
            existingAttendance={attendance}
            onSave={handleAttendanceSave}
            projectId={project.id}
          />
        </TabsContent>

        <TabsContent value="reports" className="mt-4">
          <AttendanceSummary attendance={attendance} workers={workers} />
        </TabsContent>
      </Tabs>

      <WorkerForm
        projectId={project.id}
        onSubmit={() => {}}
        onUpdate={handleUpdateWorker}
        worker={editingWorker}
        open={!!editingWorker}
        onOpenChange={(open) => {
          if (!open) setEditingWorker(null);
        }}
      />
    </div>
  );
}
