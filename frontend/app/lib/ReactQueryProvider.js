"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 1 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;


// > If you want to use React Query v5, there are only two small
// things to change in the project:

// 1. isLoading is now called isPending

// 2. The cacheTime option is now called gcTime