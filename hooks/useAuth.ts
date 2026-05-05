"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useAuth() {
  const { isHydrated, user, fetchMe, ...rest } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthPage =
      pathname === "/login" || pathname === "/forgot-password";
    if (!isHydrated || user || isAuthPage) return;
    fetchMe().catch(() => {});
  }, [isHydrated, user, pathname, fetchMe]);

  return { isHydrated, user, fetchMe, ...rest };
}