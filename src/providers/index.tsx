import { ProviderProps } from "./providers-type";
import { ThemeProvider as TailwindThemeProvider } from "@material-tailwind/react";
import { QueryProvider } from "./query-provider";
import { ToastProvider } from "./toast-provider";
import { ThemeProvider as MaterialThemeProvider } from "@emotion/react";
import Loader from "@/components/common/loader";
import { usePromiseTracker } from "react-promise-tracker";

export const Provider = ({ children }: ProviderProps) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <QueryProvider>
      <TailwindThemeProvider>
        <MaterialThemeProvider theme={{}}>
          <Loader isLoading={promiseInProgress} />
          <ToastProvider />
          {children}
        </MaterialThemeProvider>
      </TailwindThemeProvider>
    </QueryProvider>
  );
};
