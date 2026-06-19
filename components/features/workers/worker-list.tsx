"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/shared/empty-state";
import { Search, User, Pencil, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Worker } from "@/lib/types";
import { useState } from "react";

interface WorkerListProps {
  workers: Worker[];
  onEdit: (worker: Worker) => void;
  onDelete: (id: string) => void;
}

export function WorkerList({ workers, onEdit, onDelete }: WorkerListProps) {
  const [search, setSearch] = useState("");
  const filtered = workers.filter(
    (w) =>
      w.fullName.toLowerCase().includes(search.toLowerCase()) ||
      w.role.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search workers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          icon={User}
          title="No workers found"
          description={
            search ? "Try another search." : "Add your first worker."
          }
        />
      ) : (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Daily Wage
                </TableHead>
                <TableHead className="font-semibold hidden md:table-cell">
                  Phone
                </TableHead>
                <TableHead className="font-semibold w-[80px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((worker) => (
                <TableRow key={worker.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <span className="font-medium text-slate-900">
                      {worker.fullName}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-slate-600">
                    {worker.role}
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold">
                    {formatCurrency(worker.dailyWage)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-slate-600">
                    {worker.phone}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(worker)}
                        className="h-8 w-8 text-slate-400 hover:text-orange-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(worker.id)}
                        className="h-8 w-8 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
