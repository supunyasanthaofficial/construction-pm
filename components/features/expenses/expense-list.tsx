"use client";

import { useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { EXPENSE_CATEGORY_OPTIONS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { Search, Filter, Receipt, Trash2 } from "lucide-react";
import type { Expense } from "@/lib/types";

type SortOrder = "newest" | "oldest" | "highest" | "lowest";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || expense.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-slate-50">
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Total Expenses
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {formatCurrency(totalAmount)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50">
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Transactions
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {filteredExpenses.length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50">
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Avg. Amount
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {filteredExpenses.length > 0
                ? formatCurrency(totalAmount / filteredExpenses.length)
                : formatCurrency(0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(EXPENSE_CATEGORY_OPTIONS).map(
              ([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
        <Select
          value={sortOrder}
          onValueChange={(value: SortOrder) => setSortOrder(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Amount</SelectItem>
            <SelectItem value="lowest">Lowest Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Expenses Table */}
      {filteredExpenses.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No expenses found"
          description={
            search || categoryFilter !== "all"
              ? "Try adjusting your filters."
              : "Start tracking your project expenses."
          }
        />
      ) : (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Category
                </TableHead>
                <TableHead className="font-semibold hidden md:table-cell">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Amount
                </TableHead>
                <TableHead className="font-semibold w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => {
                const category = EXPENSE_CATEGORY_OPTIONS[expense.category];
                return (
                  <TableRow key={expense.id} className="hover:bg-slate-50/50">
                    <TableCell>
                      <p className="font-medium text-slate-900 text-sm">
                        {expense.description}
                      </p>
                      <p className="text-xs text-slate-500 sm:hidden mt-0.5">
                        {category.label} · {formatDate(expense.date)}
                      </p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: category.color,
                          color: category.color,
                          backgroundColor: `${category.color}10`,
                        }}
                      >
                        {category.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-slate-600">
                      {formatDate(expense.date)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(expense.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-600"
                        onClick={() => onDelete(expense.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
