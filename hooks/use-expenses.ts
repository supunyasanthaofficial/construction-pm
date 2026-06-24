import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Expense } from "@/lib/types";

const supabase = createClient();

export function useExpenses(projectId: string) {
  return useQuery({
    queryKey: ["expenses", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("project_id", projectId)
        .order("expense_date", { ascending: false });
      if (error) throw error;
      return data as Expense[];
    },
    enabled: !!projectId,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      newExpense: Omit<Expense, "id" | "created_at" | "created_by">,
    ) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("expenses")
        .insert({ ...newExpense, created_by: user.id })
        .select()
        .single();
      if (error) throw error;
      return data as Expense;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["expenses", variables.projectId],
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // to update budget spent
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (expenseId: string) => {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", expenseId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
