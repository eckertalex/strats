import {
  AlertCircle as AlertCircleIcon,
  Loader2 as Loader2Icon,
  Activity as ActivityIcon,
} from "lucide-react";

import { useActivities } from "@/features/activities/use-activities";
import { Activity } from "@/features/activities/activity";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function Activities() {
  const {
    data: activities,
    isLoading: isActivitiesLoading,
    error: activitiesError,
    refetch: refetchActivities,
  } = useActivities({ per_page: 200 });

  if (isActivitiesLoading) {
    return (
      <div className="text-center py-8">
        <Loader2Icon className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading your activities...</p>
      </div>
    );
  }

  if (activitiesError) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertDescription>
          <p className="font-medium">Failed to load activities</p>
          <p className="text-sm mt-1">{activitiesError.message}</p>
          <Button variant="outline" size="sm" onClick={() => refetchActivities()} className="mt-3">
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!activities?.length) {
    return (
      <div className="text-center py-8">
        <ActivityIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No activities found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Activities</h3>
      <div className="grid gap-4">
        {activities.map((activity) => (
          <Activity key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
