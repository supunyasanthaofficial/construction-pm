"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  FileText,
  Download,
  Trash2,
  Filter,
  //   FilePdf,
  FileSpreadsheet,
  Image,
  File,
  FilePen,
} from "lucide-react";
import type { Document } from "@/lib/types";

interface DocumentListProps {
  documents: Document[];
  onDelete: (id: string) => void;
}

const FILE_TYPE_ICONS: Record<string, React.ReactNode> = {
  pdf: <FilePen className="h-5 w-5 text-red-600" />,
  xlsx: <FileSpreadsheet className="h-5 w-5 text-green-600" />,
  xls: <FileSpreadsheet className="h-5 w-5 text-green-600" />,
  jpg: <Image className="h-5 w-5 text-blue-600" />,
  png: <Image className="h-5 w-5 text-blue-600" />,
  doc: <FileText className="h-5 w-5 text-blue-500" />,
  docx: <FileText className="h-5 w-5 text-blue-500" />,
};

export function DocumentList({ documents, onDelete }: DocumentListProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || doc.fileType === typeFilter;
    return matchesSearch && matchesType;
  });

  const availableTypes = [...new Set(documents.map((d) => d.fileType))];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="File type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {availableTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No documents found"
          description={
            search || typeFilter !== "all"
              ? "Try adjusting your filters."
              : "Upload your first document."
          }
        />
      ) : (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Type
                </TableHead>
                <TableHead className="font-semibold hidden md:table-cell">
                  Size
                </TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">
                  Uploaded By
                </TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">
                  Date
                </TableHead>
                <TableHead className="font-semibold w-[100px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>
                        {FILE_TYPE_ICONS[doc.fileType] || (
                          <File className="h-5 w-5" />
                        )}
                      </span>
                      <span className="font-medium text-slate-900 truncate max-w-[200px]">
                        {doc.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm uppercase text-slate-600">
                    {doc.fileType}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-slate-600">
                    {doc.fileSize}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-slate-600">
                    {doc.uploadedBy}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-slate-600">
                    {formatDate(doc.uploadedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-blue-600"
                        onClick={() => {
                          // Simulate download – in real app use file URL
                          alert(`Downloading ${doc.name} (mock)`);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-600"
                        onClick={() => onDelete(doc.id)}
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
