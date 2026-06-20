"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { mockProjects } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Package,
  FileText,
  BarChart3,
} from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const project = mockProjects.find((p) => p.id === params.id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-xl font-semibold text-slate-900">
          Project not found
        </h2>
        <Link href="/projects" className="mt-4">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const budgetUtilization = (project.totalExpenses / project.budget) * 100;

  return (
    <div className="space-y-6">
      <PageHeader title={project.name} description={project.description}>
        <Link href="/projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
      </PageHeader>

      {/* Project Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Timeline</p>
              <p className="text-sm font-semibold text-slate-900">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-green-50 p-2">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Budget</p>
              <p className="text-sm font-semibold text-slate-900">
                {formatCurrency(project.budget)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-2">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Location</p>
              <p className="text-sm font-semibold text-slate-900">
                {project.location}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-orange-50 p-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Status</p>
              <StatusBadge status={project.status} className="mt-0.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Budget Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">
              {formatCurrency(project.totalExpenses)} of{" "}
              {formatCurrency(project.budget)}
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {budgetUtilization.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                budgetUtilization > 90
                  ? "bg-red-500"
                  : budgetUtilization > 75
                    ? "bg-amber-500"
                    : "bg-emerald-500"
              }`}
              style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white border rounded-lg p-1">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="budget" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Budget
          </TabsTrigger>
          <TabsTrigger value="materials" className="gap-2">
            <Package className="h-4 w-4" />
            Materials
          </TabsTrigger>
          <TabsTrigger value="workers" className="gap-2">
            <Users className="h-4 w-4" />
            Workers
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview"></TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Budget Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Total Budget</span>
                <span className="text-sm font-medium">
                  {formatCurrency(project.budget)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Spent</span>
                <span className="text-sm font-medium text-amber-600">
                  {formatCurrency(project.totalExpenses)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Remaining</span>
                <span className="text-sm font-medium text-emerald-600">
                  {formatCurrency(project.budget - project.totalExpenses)}
                </span>
              </div>
              <Link href={`/projects/${project.id}/budget`}>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Full Budget Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Materials Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-500">
                Quick glance at materials status.
              </p>
              <Link href={`/projects/${project.id}/materials`}>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Package className="h-4 w-4 mr-2" />
                  Manage Materials
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="workers">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Worker Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-500">
                Manage workers and attendance records.
              </p>
              <Link href={`/projects/${project.id}/workers`}>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Workers & Attendance
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-500">
                View and upload project documents.
              </p>
              <Link href={`/projects/${project.id}/documents`}>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <FileText className="h-4 w-4 mr-2" />
                  Manage Documents
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
