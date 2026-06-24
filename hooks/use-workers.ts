import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Worker } from "@/lib/types";

const supabase = createClient();

export function useWorkers(projectId: string) {
  return useQuery({
    queryKey: ["workers", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workers")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Worker[];
    },
    enabled: !!projectId,
  });
}

export function useCreateWorker() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newWorker: Omit<Worker, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("workers")
        .insert(newWorker)
        .select()
        .single();
      if (error) throw error;
      return data as Worker;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["workers", variables.projectId],
      });
    },
  });
}

export function useUpdateWorker() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Worker> & { id: string }) => {
      const { data, error } = await supabase
        .from("workers")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as Worker;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
    },
  });
}

export function useDeleteWorker() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (workerId: string) => {
      const { error } = await supabase
        .from("workers")
        .delete()
        .eq("id", workerId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
  });
}
