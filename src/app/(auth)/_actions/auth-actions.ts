import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function exchangeGoogleCodeForSession(code: string) {
  const supabase = await createClient();
  await supabase.auth.exchangeCodeForSession(code);
}

export async function signOutCurrentUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
