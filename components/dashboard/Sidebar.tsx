"use client";

import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// ===================== Types =====================
export type NavItem = {
  id: number;
  label: string;
  href: string;
  icon: LucideIcon | React.ComponentType<any>;
  children?: NavItem[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  panelLabel: string;
  onLogout: () => void;
};

// ===================== NavMenu (real component, not inline function) =====================
const NavMenu = ({
  navItems,
  onClose,
  onLogout,
}: {
  navItems: NavItem[];
  onClose: () => void;
  onLogout: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter(); 
  const [expandedIds, setExpandedIds] = useState<number[]>(() => {
    // Auto-expand parent if a child is currently active on first load
    return navItems
      .filter(item => item.children?.some(child => child.href === pathname))
      .map(item => item.id);
  });

  // Re-sync expanded state when pathname changes (e.g. after 404 navigation)
  useEffect(() => {
    setExpandedIds(
      navItems
        .filter(item => item.children?.some(child => child.href === pathname))
        .map(item => item.id)
    );
  }, [pathname]);

  const toggleExpanded = (id: number) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  
    router.push("/challenges/all");
  };

  return (
    <div className="flex flex-col h-full bg-[#161616] text-white w-full border-r border-[#FFFFFF1A]">
      {/* Header */}
      <div className="text-xl font-bold text-center px-4 py-3 border-b border-white/10 h-19.5">
        <div className="flex justify-start items-end h-full">
          <Image src="/images/auth/limtlss.png" alt="Logo" width={101} height={30} />
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 md:py-8 py-4 space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            item={item}
            onNavigate={onClose}
            expanded={expandedIds.includes(item.id)}
            onToggle={() => toggleExpanded(item.id)}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => { onClose(); onLogout(); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

// ===================== Sidebar =====================
export const Sidebar = ({ open, onClose, navItems, panelLabel, onLogout }: Props) => {
  const pathname = usePathname();
  return (
    <>
      {/* Desktop — key forces remount on route change, preventing stale onClick */}
      <aside className="hidden md:flex w-[260px] shrink-0">
        <NavMenu key={`desktop-${pathname}`} navItems={navItems} onClose={() => {}} onLogout={onLogout} />
      </aside>

      {/* Mobile */}
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 border w-[240px]">
          <NavMenu key={`mobile-${pathname}`} navItems={navItems} onClose={onClose} onLogout={onLogout} />
        </SheetContent>
      </Sheet>
    </>
  );
};

// ===================== NavLink =====================
const NavLink = ({
  item,
  onNavigate,
  expanded,
  onToggle,
}: {
  item: NavItem;
  onNavigate?: () => void;
  expanded: boolean;
  onToggle: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;
  const isChildActive = item.children?.some(child => pathname === child.href);

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-base transition-colors font-medium",
            isChildActive
              ? "bg-[#F6D642] text-black"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          )}
        >
          <item.icon className="w-6 h-6 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              expanded ? "rotate-180" : ""
            )}
          />
        </button>

        {expanded && (
          <div className="ml-4 mt-1 flex flex-col relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-white/20 h-[90%]" />
            {item.children!.map((child) => {
              const isChildItemActive = pathname === child.href;
              return (
                <Link
                  key={child.id}
                  href={child.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 pl-7 pr-3 py-2.5 text-sm font-medium transition-colors relative",
                    isChildItemActive ? "text-[#F6D642]" : "text-white/50 hover:text-white"
                  )}
                >
                  <div className={cn(
                    "absolute left-3 top-1/2 w-3 h-px",
                    isChildItemActive ? "bg-[#F6D642]" : "bg-white/20"
                  )} />
                  {child.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md text-base transition-colors font-medium",
        isActive ? "bg-[#F6D642] text-black font-medium" : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
    >
      <item.icon className={cn("w-6 h-6 shrink-0 text-white hover:text-black transition-colors duration-200", isActive ? "text-black" : "text-white/80")} />
      <span className={cn("flex-1 text-left", isActive ? "text-black" : "text-white/80")}>{item.label}</span>
    </Link>
  );
};