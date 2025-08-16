import { useEffect } from "react";
import { useLocation } from "wouter";

import { AuthorizedContent } from "@/components/authorized-content";
import { useAthleteActivities } from "@/hooks/use-athlete-activities";
import { getStoredTokens, clearStoredTokens } from "@/lib/token-manager";

export function Dashboard() {
  const [, setLocation] = useLocation();
  const tokens = getStoredTokens();

  // Check for OAuth params and redirect to login to handle them
  const searchParams = new URLSearchParams(window.location.search);
  const hasOAuthParams = searchParams.has("code") || searchParams.has("error");

  useEffect(() => {
    if (hasOAuthParams) {
      // Redirect to login with the OAuth params to handle the callback
      setLocation(`/login${window.location.search}`);
      return;
    }

    if (!tokens) {
      setLocation("/login");
    }
  }, [tokens, setLocation, hasOAuthParams]);

  const {
    data: activities,
    isLoading: isActivitiesLoading,
    error: activitiesError,
    refetch: refetchActivities,
  } = useAthleteActivities({ per_page: 200 });

  if (hasOAuthParams || !tokens) {
    return null;
  }

  return (
    <AuthorizedContent
      tokenData={tokens}
      activities={activities}
      isActivitiesLoading={isActivitiesLoading}
      activitiesError={activitiesError instanceof Error ? activitiesError : undefined}
      refetchActivities={refetchActivities}
      onLogout={() => {
        clearStoredTokens();
        setLocation("/login");
      }}
    />
  );
}
