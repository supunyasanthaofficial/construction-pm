import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Attendance } from "@/lib/types";

const supabase = createClient();

export function useAttendance(projectId: string, date?: string) {
  return useQuery({
    queryKey: ["attendance", projectId, date],
    queryFn: async () => {
      let query = supabase
        .from("attendance")
        .select("*")
        .eq("project_id", projectId);
      if (date) query = query.eq("date", date);
      const { data, error } = await query.order("date", { ascending: false });
      if (error) throw error;
      return data as Attendance[];
    },
    enabled: !!projectId,
  });
}

export function useSaveAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (records: Omit<Attendance, "id" | "created_at">[]) => {
      // Use upsert to avoid duplicates on (worker_id, date)
      const { error } = await supabase
        .from("attendance")
        .upsert(records, { onConflict: "worker_id, date" });
      if (error) throw error;
    },
    onSuccess: (_, records) => {
      const projectId = records[0]?.projectId;
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: ["attendance", projectId] });
      }
    },
  });
}
