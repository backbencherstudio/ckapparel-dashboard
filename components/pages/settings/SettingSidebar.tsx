"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "General", href: "/dashboard/settings/general" },
  { label: "Password", href: "/dashboard/settings/password" },
  { label: "Notification", href: "/dashboard/settings/notification" },
];

export default function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex min-h-[calc(100vh-220px)] flex-col items-start gap-3 border [background:rgba(255,255,255,0.10)] px-4 py-6 rounded-xl border-solid border-[rgba(255,255,255,0.10)] w-[232px]">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded-lg text-sm transition-colors w-full ${
            pathname === link.href
              ? "bg-black text-sm text-white font-medium "   // active
              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}