import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-sm text-gray-500">Sesion iniciada como</p>
          <p className="font-semibold text-gray-900">{user.email}</p>
        </div>
        <a
          href="/auth/logout"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          Cerrar sesion
        </a>
      </header>

      <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Dashboard de CreatorSEO.ai
        </h1>
        <p className="text-gray-600">
          Tu autenticacion con Google esta activa. En el siguiente paso podemos
          conectar esta area con tus funcionalidades de analitica y SEO.
        </p>
      </section>
    </main>
  );
}
