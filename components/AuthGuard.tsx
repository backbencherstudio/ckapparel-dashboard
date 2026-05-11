"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isHydrated } = useAuth();

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) router.replace("/login");
  }, [user, isHydrated]);

  if (!isHydrated || !user) {
    return <div>Loading...</div>; // replace with your spinner
  }

  return <>{children}</>;
}