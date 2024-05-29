import { ThemeProvider as MaterialThemeProvider } from "@emotion/react";
import { ThemeProvider as TailwindThemeProvider } from "@material-tailwind/react";
import { ProviderProps } from "./providers-type";
import { QueryProvider } from "./query-provider";
import { ToastProvider } from "./toast-provider";

export const Provider = ({ children }: ProviderProps) => {
  return (
    <QueryProvider>
      <TailwindThemeProvider>
        <MaterialThemeProvider theme={{}}>
          <ToastProvider />
          {children}
        </MaterialThemeProvider>
      </TailwindThemeProvider>
    </QueryProvider>
  );
};
