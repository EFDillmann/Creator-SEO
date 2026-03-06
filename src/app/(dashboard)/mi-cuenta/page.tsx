import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/shared/components/ui/icon";
import { getYouTubeChannel } from "../_actions/youtube-actions";
import { ConnectYouTubeButton } from "./_components/connect-youtube-button";
import { CopyReferralButton } from "./_components/copy-referral-button";

export default async function MiCuentaPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) return null;

  const channel = await getYouTubeChannel(session?.provider_token ?? null);
  const referralLink = `creatorseo.ai/ref/u/${user.id?.slice(0, 8) ?? "alex"}`;

  return (
    <div className="flex flex-1 flex-col items-center">
      <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-100 bg-white/95 px-8 py-4 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-black">Mi Cuenta</h2>
      </header>

      <div className="flex w-full max-w-3xl flex-1 flex-col gap-8 p-8">
        {/* Configuración de la cuenta */}
        <section className="flex items-start justify-between gap-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 text-gray-400">
              <Icon name="person" className="text-4xl" />
            </div>
            <div>
              <h1 className="mb-1 text-2xl font-bold text-black">
                Configuración de la cuenta
              </h1>
              <p className="font-medium text-[#606060]">{user.email}</p>
              <div className="mt-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Plan Pro Activo
              </div>
            </div>
          </div>
          <Link
            href="#"
            className="text-sm font-medium text-red-500 underline hover:text-[#cc0000]"
          >
            Editar perfil
          </Link>
        </section>

        {/* Referir a un amigo */}
        <section className="relative flex flex-col overflow-hidden rounded-xl border border-red-100 bg-red-50 p-8 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="pointer-events-none absolute -right-4 -top-4 z-0 opacity-10">
            <Icon name="redeem" className="text-9xl text-red-500" />
          </div>
          <div className="relative z-10 max-w-md space-y-2">
            <h3 className="flex items-center gap-2 text-lg font-bold text-black">
              <Icon name="favorite" className="text-red-500" />
              Referir a un amigo
            </h3>
            <p className="text-sm leading-relaxed text-[#606060]">
              Invita a otros creadores y obtén 1 mes gratis de CreatorSEO Pro
              por cada amigo que se suscriba.
            </p>
          </div>
          <div className="relative z-10 flex flex-shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <div className="select-all rounded border border-red-100 bg-white px-3 py-2 font-mono text-sm text-gray-500">
              {referralLink}
            </div>
            <CopyReferralButton referralLink={referralLink} />
          </div>
        </section>

        {/* Cuentas Vinculadas */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-black">Cuentas Vinculadas</h3>
          {channel ? (
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm">
              <div className="flex items-center gap-4">
                {channel.thumbnails?.default?.url ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-red-600">
                    <Image
                      src={channel.thumbnails.default.url}
                      alt={channel.title}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
                    <Icon name="play_arrow" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-black">Canal de YouTube</p>
                  <p className="text-sm text-[#606060]">
                    Conectado como &quot;{channel.title}&quot;
                  </p>
                </div>
              </div>
              <a
                href="/api/auth/logout"
                className="flex items-center gap-2 rounded border border-gray-300 px-4 py-2 text-sm font-medium text-[#0f0f0f] transition-colors hover:bg-gray-50 hover:text-black"
              >
                <Icon name="link_off" className="text-lg" />
                Desvincular cuenta
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-400">
                  <Icon name="play_arrow" />
                </div>
                <div>
                  <p className="font-bold text-black">Canal de YouTube</p>
                  <p className="text-sm text-[#606060]">
                    Conecta tu canal para acceder a tus videos y analíticas.
                  </p>
                </div>
              </div>
              <ConnectYouTubeButton />
            </div>
          )}
        </section>

        <hr className="my-2 border-gray-100" />

        {/* Zona de Peligro */}
        <section className="space-y-6">
          <h3 className="text-lg font-bold text-black">Zona de Peligro</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between rounded-lg border border-transparent bg-gray-50 p-4 transition-colors hover:border-gray-200">
              <div>
                <p className="text-sm font-bold text-black">
                  Cerrar sesión en todos los dispositivos
                </p>
                <p className="mt-1 text-xs text-[#606060]">
                  Se te pedirá que inicies sesión nuevamente.
                </p>
              </div>
              <a
                href="/api/auth/logout"
                className="rounded border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#0f0f0f] transition-colors hover:bg-gray-50 hover:text-black"
              >
                Cerrar sesión
              </a>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-red-100/50 bg-red-50/30 p-4">
              <div>
                <p className="text-sm font-bold text-[#cc0000]">
                  Borrar cuenta de CreatorSEO
                </p>
                <p className="mt-1 text-xs text-red-800/70">
                  Esta acción es permanente y no se puede deshacer.
                </p>
              </div>
              <button
                type="button"
                className="rounded px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
              >
                Eliminar cuenta
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
