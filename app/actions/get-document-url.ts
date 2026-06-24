"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getDocumentSignedUrl(filePath: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from("project-documents")
    .createSignedUrl(filePath, 60 * 5); // 5 minutes expiry

  if (error) throw new Error(error.message);
  return data.signedUrl;
}
