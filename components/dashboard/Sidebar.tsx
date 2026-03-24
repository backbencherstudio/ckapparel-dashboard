"use client";

import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  panelLabel: string;
  onLogout: () => void;
};

export const Sidebar = ({
  open,
  onClose,
  navItems,
  panelLabel,
  onLogout,
}: Props) => {
  const renderNav = (handleClose: () => void) => (
    <div className="flex flex-col h-full bg-[#161616] text-white w-full border-r border-[#FFFFFF1A]">
      
      {/* Header */}
      <div className="text-xl font-bold text-center py-3 border-b border-white/10 h-19.5">
        {/* {panelLabel} */}


      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.id} item={item} onNavigate={handleClose} />
        ))}
      </nav>

      {/* Logout (BOTTOM) */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => {
            handleClose();
            onLogout();
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex w-[260px] shrink-0">
        {renderNav(() => {})}
      </aside>

      {/* Mobile */}
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 border w-[240px]">
          {renderNav(onClose)}
        </SheetContent>
      </Sheet>
    </>
  );
};

// ===================== Types =====================

export type NavItem = {
  id: number;
  label: string;
  href: string;
  icon: LucideIcon;
};

// ===================== NavLink =====================

const NavLink = ({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
        isActive
          ? "bg-white text-black font-medium"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
    >
      <item.icon className="w-4 h-4 shrink-0" />
      {item.label}
    </Link>
  );
};