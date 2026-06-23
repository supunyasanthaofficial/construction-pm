import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/lib/types";

const supabase = createClient();

// Fetch all projects the user has access to (RLS handles filtering)
export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });
}

// Fetch a single project by ID
export function useProject(projectId: string) {
  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();
      if (error) throw error;
      return data as Project;
    },
    enabled: !!projectId,
  });
}

// Create a new project
export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      newProject: Omit<Project, "id" | "created_at" | "created_by">,
    ) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("projects")
        .insert({ ...newProject, created_by: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data as Project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// Update a project
export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Project> & { id: string }) => {
      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as Project;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", variables.id] });
    },
  });
}

// Delete a project
export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// export function useProject() {
//   return useQuery({
//          queryKey: ['projects'],
//          queryFn: fetchProjects,
//          staleTime: 1000 * 60 * 5
//   })
// }
