import { useQuery } from "@tanstack/react-query";

import { stravaFetch } from "@/lib/strava-client";
import type { SummaryActivity } from "@/types";

type ActivitiesParams = {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
};

export function useActivities(params: ActivitiesParams = {}) {
  return useQuery({
    queryKey: ["strava-activities", params],
    queryFn: () => getActivities(params),
  });
}

export function getActivities(params: ActivitiesParams = {}): Promise<SummaryActivity[]> {
  const queryParams = new URLSearchParams();
  if (params.before) {
    queryParams.append("before", params.before.toString());
  }
  if (params.after) {
    queryParams.append("after", params.after.toString());
  }
  if (params.page) {
    queryParams.append("page", params.page.toString());
  }
  if (params.per_page) {
    queryParams.append("per_page", params.per_page.toString());
  }

  const endpoint = `/athlete/activities${queryParams.toString() ? `?${queryParams}` : ""}`;

  return stravaFetch(endpoint);
}
