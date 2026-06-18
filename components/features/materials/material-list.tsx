"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
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
import { Search, Package, Pencil, Trash2 } from "lucide-react";
import type { Material } from "@/lib/types";

interface MaterialListProps {
  materials: Material[];
  onDelete: (id: string) => void;
  onEdit: (material: Material) => void;
}

export function MaterialList({
  materials,
  onDelete,
  onEdit,
}: MaterialListProps) {
  const [search, setSearch] = useState("");

  const filtered = materials.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.supplier.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No materials found"
          description={
            search ? "Try a different search." : "Add your first material."
          }
        />
      ) : (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Unit</TableHead>
                <TableHead className="font-semibold text-right">
                  Ordered
                </TableHead>
                <TableHead className="font-semibold text-right">Used</TableHead>
                <TableHead className="font-semibold text-right">
                  Remaining
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Unit Cost
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Total Cost
                </TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">
                  Supplier
                </TableHead>
                <TableHead className="font-semibold w-[80px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((mat) => {
                const remaining = mat.quantityOrdered - mat.quantityUsed;
                const totalCost = mat.quantityUsed * mat.unitCost;
                const isLowStock =
                  mat.quantityOrdered > 0 &&
                  remaining / mat.quantityOrdered < 0.2;
                return (
                  <TableRow key={mat.id} className="hover:bg-slate-50/50">
                    <TableCell>
                      <span className="font-medium text-slate-900">
                        {mat.name}
                      </span>
                      {isLowStock && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                          Low Stock
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {mat.unit}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {mat.quantityOrdered.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {mat.quantityUsed.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className={`text-right text-sm font-medium ${remaining < 0 ? "text-red-600" : "text-slate-700"}`}
                    >
                      {remaining.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {formatCurrency(mat.unitCost)}
                    </TableCell>
                    <TableCell className="text-right text-sm font-semibold">
                      {formatCurrency(totalCost)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-slate-600">
                      {mat.supplier}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(mat)}
                          className="h-8 w-8 text-slate-400 hover:text-orange-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(mat.id)}
                          className="h-8 w-8 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
