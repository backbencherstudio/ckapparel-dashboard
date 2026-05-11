// "use client";

// import { useAuthStore } from "@/store/authStore";
// import { useEffect } from "react";
// import { usePathname } from "next/navigation";

// export function useAuth() {
//   const { isHydrated, user, fetchMe, ...rest } = useAuthStore();
//   const pathname = usePathname();

//   useEffect(() => {
//     const isAuthPage =
//       pathname === "/login" || pathname === "/forgot-password";
//     if (!isHydrated || user || isAuthPage) return;
//     fetchMe().catch(() => {});
//   }, [isHydrated, user, pathname, fetchMe]);

//   return { isHydrated, user, fetchMe, ...rest };
// }


"use client";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const PUBLIC_PATHS = ["/login", "/forgot-password"];

export function useAuth() {
  const pathname = usePathname();
  const store = useAuthStore();
  const isPublicRoute = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (!store.isHydrated || isPublicRoute) return;
    // if (!isHydrated || user || isAuthPage) return;
    // ↑ store.user check সরানো হয়েছে
    store.fetchMe().catch(() => {});
  }, [store.isHydrated, isPublicRoute]);

  return store;
}