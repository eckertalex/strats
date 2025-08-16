import { Activity as ActivityIcon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

import { AppRouter } from "@/app/router";
import { Auth } from "@/features/auth/auth";
import { useAuth } from "@/features/auth/auth-context";
import { ThemeToggle } from "@/features/theme/theme-toggle";
import { ErrorFallback } from "@/components/error-fallback";
import { Button } from "@/components/ui/button";

export function App() {
  const { isAuthenticated, disconnect } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ActivityIcon />
            <h1 className="text-2xl font-bold">Strats</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? <Button onClick={disconnect}>Disconnect</Button> : null}
            <ThemeToggle />
          </div>
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
          {isAuthenticated ? <AppRouter /> : <Auth />}
        </ErrorBoundary>
      </main>
    </div>
  );
}
