import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Package, AlertTriangle, DollarSign } from "lucide-react";
import type { Material } from "@/lib/types";

interface MaterialStatsProps {
  materials: Material[];
}

export function MaterialStats({ materials }: MaterialStatsProps) {
  const totalCost = materials.reduce(
    (sum, m) => sum + m.quantityUsed * m.unitCost,
    0,
  );
  const lowStockCount = materials.filter((m) => {
    const remaining = m.quantityOrdered - m.quantityUsed;
    return m.quantityOrdered > 0 && remaining / m.quantityOrdered < 0.2;
  }).length;
  const itemCount = materials.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="bg-slate-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Total Items
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {itemCount}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-slate-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="rounded-lg bg-emerald-50 p-2">
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Total Material Cost
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {formatCurrency(totalCost)}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-slate-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div
            className={`rounded-lg p-2 ${lowStockCount > 0 ? "bg-red-50" : "bg-slate-100"}`}
          >
            <AlertTriangle
              className={`h-5 w-5 ${lowStockCount > 0 ? "text-red-600" : "text-slate-400"}`}
            />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Low Stock Items
            </p>
            <p
              className={`text-2xl font-bold mt-1 ${lowStockCount > 0 ? "text-red-600" : "text-slate-900"}`}
            >
              {lowStockCount}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
