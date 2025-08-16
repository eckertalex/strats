import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AppProviders } from "@/app/providers";
import { App } from "@/app/app";
import { ErrorFallback } from "@/components/error-fallback";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.history.replaceState({}, "", window.location.pathname);
        window.location.reload();
      }}
    >
      <AppProviders>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>
);
