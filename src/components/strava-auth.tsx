import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthorizedContent } from "@/components/authorized-content";
import { Unauthorized } from "@/components/unauthorized";
import { useAuthToken } from "@/hooks/use-auth-token";
import { useAthleteActivities } from "@/hooks/use-athlete-activities";
import { getStoredTokens } from "@/lib/token-manager";
import { clearUrlParams } from "@/lib/oauth-utils";

export function StravaAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const {
    data: tokenData,
    isLoading: isTokenLoading,
    error: tokenError,
    isSuccess: isTokenSuccess,
  } = useAuthToken({
    code,
    state,
    enabled: code !== null && !error,
  });

  const {
    data: activities,
    isLoading: isActivitiesLoading,
    error: activitiesError,
    refetch: refetchActivities,
  } = useAthleteActivities({ per_page: 200 });

  useEffect(() => {
    const tokens = getStoredTokens();
    setIsAuthenticated(!!tokens);
    if (tokens) {
      refetchActivities();
    }
  }, [refetchActivities]);

  useEffect(() => {
    if (isTokenSuccess && tokenData) {
      setIsAuthenticated(true);
      refetchActivities();
      const timer = setTimeout(clearUrlParams, 2000);
      return () => clearTimeout(timer);
    }
  }, [isTokenSuccess, tokenData, refetchActivities]);

  if (error) {
    const errorMessages: Record<string, string> = {
      access_denied: "Access was denied. You need to authorize the application to continue.",
      invalid_request: "Invalid request. Please try connecting again.",
      unauthorized_client: "Application is not authorized.",
      unsupported_response_type: "Unsupported response type.",
      invalid_scope: "Invalid permissions requested.",
    };

    const message =
      errorMessages[error] || errorDescription || "An unknown error occurred during authorization.";

    return (
      <div className="max-w-md mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-medium">Authorization Failed</p>
            <p className="text-sm mt-1">{message}</p>
            <Button variant="outline" size="sm" onClick={clearUrlParams} className="mt-3">
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (tokenError) {
    throw tokenError;
  }

  if (isTokenLoading) {
    return (
      <div className="text-center max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span>Connecting to Strava...</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Please wait while we complete the authorization process.
        </p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <AuthorizedContent
        tokenData={tokenData}
        activities={activities}
        isActivitiesLoading={isActivitiesLoading}
        activitiesError={activitiesError instanceof Error ? activitiesError : undefined}
        refetchActivities={refetchActivities}
        onLogout={() => setIsAuthenticated(false)}
      />
    );
  }

  return <Unauthorized />;
}
