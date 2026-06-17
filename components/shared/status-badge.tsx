import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUS_OPTIONS } from "@/lib/constants";
import type { ProjectStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const option = PROJECT_STATUS_OPTIONS[status];
  return (
    <Badge variant="outline" className={`${option.color} border ${className}`}>
      {option.label}
    </Badge>
  );
}
