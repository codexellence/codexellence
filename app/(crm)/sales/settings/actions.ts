"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function updateProfileSettings(formData: FormData) {
  const supabase = await createClient();

  const fullName = String(formData.get("fullName") || "").trim();
  const role = String(formData.get("role") || "").trim();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      role,
    })
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/sales/settings");
  revalidatePath("/sales");
}
