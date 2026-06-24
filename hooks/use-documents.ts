import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Document } from "@/lib/types";

const supabase = createClient();

export function useDocuments(projectId: string) {
  return useQuery({
    queryKey: ["documents", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("project_id", projectId)
        .order("uploaded_at", { ascending: false });
      if (error) throw error;
      return data as Document[];
    },
    enabled: !!projectId,
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      projectId,
      file,
    }: {
      projectId: string;
      file: File;
    }) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("Not authenticated");

      const filePath = `${projectId}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("project-documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data, error } = await supabase
        .from("documents")
        .insert({
          project_id: projectId,
          name: file.name,
          file_path: filePath,
          file_type: file.name.split(".").pop()?.toLowerCase(),
          file_size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploaded_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Document;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["documents", variables.projectId],
      });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (doc: Document) => {
      // Attempt to delete from storage; ignore if file not found
      const { error: storageError } = await supabase.storage
        .from("project-documents")
        .remove([doc.filePath]);
      if (storageError) console.warn("Storage delete warning:", storageError);

      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", doc.id);
      if (error) throw error;
    },
    onSuccess: (_, doc) => {
      queryClient.invalidateQueries({ queryKey: ["documents", doc.projectId] });
    },
  });
}
