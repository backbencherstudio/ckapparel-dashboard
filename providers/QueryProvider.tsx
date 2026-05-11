"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";
import { isDev } from "@/lib/constants/env";

export default function QueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5,  // 5 min
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {isDev && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}