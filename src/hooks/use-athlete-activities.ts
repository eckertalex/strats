import { useQuery } from "@tanstack/react-query";
import { fetchAthleteActivities } from "@/lib/strava-api";
import type { ActivitiesParams } from "@/types";

export function useAthleteActivities(params: ActivitiesParams = {}) {
  return useQuery({
    queryKey: ["athlete-activities", params],
    queryFn: () => fetchAthleteActivities(params),
    staleTime: 2 * 60 * 1000,
  });
}
