import { createClient } from '@/lib/supabase/client'

export async function fetchExpenses(projectId?: string) {
  const supabase = createClient()
  let query = supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false })
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}