import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProviderProps } from "./providers-type";
import { useState } from "react";

export const QueryProvider = ({ children }: ProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
