import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Switch } from "wouter";

import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { ErrorFallback } from "@/components/error-fallback";
import { Dashboard } from "@/components/dashboard";
import { Login } from "@/components/login";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes("4")) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

function AppRouter() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
      <Route>404 - Page not found</Route>
    </Switch>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Strats</h1>
              <ModeToggle />
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => {
                window.history.replaceState({}, "", window.location.pathname);
                window.location.reload();
              }}
            >
              <AppRouter />
            </ErrorBoundary>
          </main>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
