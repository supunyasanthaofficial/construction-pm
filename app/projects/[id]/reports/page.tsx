"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  mockProjects,
  mockExpenses,
  mockMaterials,
  mockAttendance,
  mockWorkers,
} from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Printer } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { printReport } from "@/lib/utils";
import { ProjectReportCharts } from "@/components/features/reports/project-report-charts";

export default function ProjectReportsPage() {
  const params = useParams();
  const project = mockProjects.find((p) => p.id === params.id);
  const expenses = mockExpenses.filter((e) => e.projectId === params.id);
  const materials = mockMaterials.filter((m) => m.projectId === params.id);
  const attendance = mockAttendance.filter((a) => a.projectId === params.id);
  const workers = mockWorkers.filter((w) => w.projectId === params.id);

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

  return (
    <div className="space-y-6 print:space-y-4">
      <PageHeader
        title={`Reports - ${project.name}`}
        description="Comprehensive analytics and printable report."
      >
        <div className="flex gap-3">
          <Link href={`/projects/${project.id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Project
            </Button>
          </Link>
          <Button onClick={printReport} variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </Button>
        </div>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500">Budget</p>
            <p className="text-xl font-bold">
              {formatCurrency(project.budget)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500">Spent</p>
            <p className="text-xl font-bold text-amber-600">
              {formatCurrency(project.totalExpenses)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500">Materials</p>
            <p className="text-xl font-bold">{materials.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500">Workers</p>
            <p className="text-xl font-bold">{workers.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <ProjectReportCharts
        project={project}
        expenses={expenses}
        materials={materials}
        attendance={attendance}
        workers={workers}
      />
    </div>
  );
}
