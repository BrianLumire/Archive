"use client";
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SoonerToaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const Client = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SoonerToaster />
      <Toaster />
      {children}

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Client;
