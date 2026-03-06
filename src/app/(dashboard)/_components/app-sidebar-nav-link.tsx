"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/shared/components/ui/icon";

interface AppSidebarNavLinkProps {
  href: string;
  icon: string;
  children: React.ReactNode;
  iconFilled?: boolean;
}

export function AppSidebarNavLink({
  href,
  icon,
  children,
  iconFilled = false,
}: AppSidebarNavLinkProps) {
  const pathname = usePathname();
  const active =
    pathname === href ||
    (href !== "/dashboard" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-3 font-medium transition-colors border-l-4 ${
        active
          ? "border-red-500 bg-red-50 text-red-500"
          : "border-transparent text-yt-text hover:bg-gray-50 hover:text-black"
      }`}
    >
      <Icon name={icon} fill={iconFilled} className="text-xl" />
      <span>{children}</span>
    </Link>
  );
}
