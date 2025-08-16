import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ActivityList } from "@/components/activity-list";
import { clearStoredTokens } from "@/lib/token-manager";
import { type SummaryActivity } from "@/types";

interface AuthorizedContentProps {
  tokenData?: {
    athlete?: {
      firstname: string;
    };
  };
  activities?: SummaryActivity[];
  isActivitiesLoading: boolean;
  activitiesError?: Error;
  refetchActivities: () => void;
  onLogout: () => void;
}

export function AuthorizedContent({
  tokenData,
  activities,
  isActivitiesLoading,
  activitiesError,
  refetchActivities,
  onLogout,
}: AuthorizedContentProps) {
  const welcomeMessage = tokenData?.athlete
    ? `Welcome back, ${tokenData.athlete.firstname}!`
    : "Welcome back!";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>
          <p className="font-medium">{welcomeMessage}</p>
          <p className="text-sm mt-1">Successfully connected to Strava.</p>
        </AlertDescription>
      </Alert>

      {isActivitiesLoading ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your activities...</p>
        </div>
      ) : activitiesError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-medium">Failed to load activities</p>
            <p className="text-sm mt-1">{activitiesError.message}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchActivities()}
              className="mt-3"
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      ) : activities ? (
        <div className="space-y-4">
          <ActivityList activities={activities} />

          <div className="text-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                clearStoredTokens();
                onLogout();
              }}
            >
              Disconnect from Strava
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
