import { ProviderProps } from "./providers-type";
import { ThemeProvider as TailwindThemeProvider } from "@material-tailwind/react";
import { QueryProvider } from "./query-provider";
import { ToastProvider } from "./toast-provider";
import { ThemeProvider as MaterialThemeProvider } from "@emotion/react";

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
