import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 antialiased">
      <div className="pointer-events-none absolute -right-1/2 -top-1/2 -z-10 h-[800px] w-[800px] rounded-full bg-red-50 opacity-40 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-1/3 -left-1/3 -z-10 h-[600px] w-[600px] rounded-full bg-gray-50 opacity-60 blur-[100px]" />

      <main className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xl shadow-gray-200/50 sm:p-10">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

          <div className="mb-8 flex items-center justify-center gap-2 text-red-500">
            <span className="text-4xl" aria-hidden="true">
              🤖
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-black">
              CreatorSEO.ai
            </h1>
          </div>

          <h2 className="mb-3 text-3xl font-bold text-black">Bienvenido de nuevo</h2>
          <p className="mb-8 leading-relaxed text-[#606060]">
            Accede a tu cuenta para empezar a optimizar tus videos.
          </p>

          <GoogleSignInButton />

          <div className="mb-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
            <p className="text-xs leading-tight text-[#606060]">
              Solo permitimos el acceso a traves de Google para garantizar la
              integracion con tus canales de YouTube.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6 text-xs text-[#606060]">
          <a className="transition-colors hover:text-red-500 hover:underline" href="#">
            Terminos de Servicio
          </a>
          <span className="text-gray-300">•</span>
          <a className="transition-colors hover:text-red-500 hover:underline" href="#">
            Politica de Privacidad
          </a>
        </div>
      </main>
    </div>
  );
}
