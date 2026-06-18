"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Material } from "@/lib/types";
import { Plus, Pencil } from "lucide-react";

interface MaterialFormProps {
  projectId: string;
  onSubmit: (data: Omit<Material, "id">) => void;
  onUpdate?: (data: Material) => void;
  material?: Material | null;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const UNITS = [
  "bags",
  "tons",
  "cubes",
  "pieces",
  "sqm",
  "meters",
  "liters",
  "kg",
];

export function MaterialForm({
  projectId,
  onSubmit,
  onUpdate,
  material,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: MaterialFormProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange ?? setInternalOpen;

  const dialogKey = material?.id ?? "new";

  const [formData, setFormData] = useState({
    name: material?.name ?? "",
    unit: material?.unit ?? "bags",
    quantityOrdered: material ? material.quantityOrdered.toString() : "",
    quantityUsed: material ? material.quantityUsed.toString() : "",
    unitCost: material ? material.unitCost.toString() : "",
    supplier: material?.supplier ?? "",
  });

  const isEditMode = !!material;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.quantityOrdered || !formData.quantityUsed)
      return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = {
      projectId,
      name: formData.name,
      unit: formData.unit,
      quantityOrdered: parseFloat(formData.quantityOrdered) || 0,
      quantityUsed: parseFloat(formData.quantityUsed) || 0,
      unitCost: parseFloat(formData.unitCost) || 0,
      supplier: formData.supplier,
    };

    if (isEditMode && onUpdate && material) {
      onUpdate({ ...material, ...data });
    } else {
      onSubmit(data);
    }

    setOpen(false);
  };

  return (
    <Dialog key={dialogKey} open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Material" : "Add New Material"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update material details."
              : "Record a new material for this project."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Material Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="focus-visible:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Select
                value={formData.unit}
                onValueChange={(v) => setFormData({ ...formData, unit: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier *</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) =>
                  setFormData({ ...formData, supplier: e.target.value })
                }
                required
                className="focus-visible:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="qtyOrdered">Ordered *</Label>
              <Input
                id="qtyOrdered"
                type="number"
                value={formData.quantityOrdered}
                onChange={(e) =>
                  setFormData({ ...formData, quantityOrdered: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qtyUsed">Used *</Label>
              <Input
                id="qtyUsed"
                type="number"
                value={formData.quantityUsed}
                onChange={(e) =>
                  setFormData({ ...formData, quantityUsed: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitCost">Unit Cost (Rs) *</Label>
              <Input
                id="unitCost"
                type="number"
                value={formData.unitCost}
                onChange={(e) =>
                  setFormData({ ...formData, unitCost: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="submit"
              disabled={formData.name === "" || formData.quantityOrdered === ""}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {isEditMode ? "Update Material" : "Add Material"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
