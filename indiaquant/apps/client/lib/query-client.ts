import { QueryClient } from "@tanstack/react-query";

/**
 * Singleton TanStack Query client.
 * Configured for financial data: stale after 5 minutes, retry once on failure.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
