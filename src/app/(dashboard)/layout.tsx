import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppSidebar } from "./_components/app-sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
      <AppSidebar />
      <main className="ml-64 flex flex-1 flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
