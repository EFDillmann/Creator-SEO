import Link from "next/link";
import { Icon } from "@/shared/components/ui/icon";
import { AppSidebarNavLink } from "./app-sidebar-nav-link";

export function AppSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center gap-2 border-b border-gray-100 p-6 text-red-500">
        <Icon name="smart_toy" className="text-3xl" />
        <Link
          href="/dashboard"
          className="text-xl font-bold tracking-tight text-black hover:text-black"
        >
          CreatorSEO.ai
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        <AppSidebarNavLink href="/dashboard" icon="video_library">
          Mis publicaciones
        </AppSidebarNavLink>
        <AppSidebarNavLink href="/mi-cuenta" icon="person" iconFilled>
          Mi cuenta
        </AppSidebarNavLink>
      </nav>

      <div className="border-t border-gray-100 p-4">
        <a
          href="/api/auth/logout"
          className="group flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-yt-gray transition-colors hover:text-red-500"
        >
          <Icon
            name="logout"
            className="transition-colors group-hover:text-red-500"
          />
          <span>Cerrar sesión</span>
        </a>
      </div>
    </aside>
  );
}
