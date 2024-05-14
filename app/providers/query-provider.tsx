"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
