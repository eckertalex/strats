import { AlertCircle as AlertCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Alert variant="destructive" className="max-w-md mx-auto mt-8">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertDescription className="mt-2">
        <p className="font-medium">Something went wrong</p>
        <p className="text-sm mt-1">{error.message}</p>
        <Button variant="outline" size="sm" onClick={resetErrorBoundary} className="mt-3">
          Try again
        </Button>
      </AlertDescription>
    </Alert>
  );
}
