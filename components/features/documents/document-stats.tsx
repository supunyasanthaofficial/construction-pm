import { Card, CardContent } from "@/components/ui/card";
import { FileText, HardDrive } from "lucide-react";
import type { Document } from "@/lib/types";

interface DocumentStatsProps {
  documents: Document[];
}

export function DocumentStats({ documents }: DocumentStatsProps) {
  const totalCount = documents.length;
  // approximate total size from strings like "4.2 MB" – naive sum for display
  const totalSizeMB = documents.reduce((sum, d) => {
    const num = parseFloat(d.fileSize);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="bg-slate-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Total Documents
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {totalCount}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-slate-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="rounded-lg bg-emerald-50 p-2">
            <HardDrive className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Total Size
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {totalSizeMB.toFixed(1)} MB
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
