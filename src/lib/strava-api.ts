import { STRAVA_CONFIG } from "./strava-config";
import { getStoredTokens, clearStoredTokens } from "./token-manager";
import type { SummaryActivity, ActivitiesParams } from "../types";

export class StravaApiError extends Error {
  public status?: number;
  public resetTime?: number;

  constructor(message: string, status?: number, resetTime?: number) {
    super(message);
    this.name = "StravaApiError";

    this.status = status;
    this.resetTime = resetTime;
  }
}

export async function fetchAthleteActivities(
  params: ActivitiesParams = {}
): Promise<SummaryActivity[]> {
  const tokens = getStoredTokens();
  if (!tokens?.access_token) {
    throw new StravaApiError("No valid access token found. Please reconnect to Strava.");
  }

  const searchParams = new URLSearchParams();
  if (params.before) searchParams.set("before", params.before.toString());
  if (params.after) searchParams.set("after", params.after.toString());
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.per_page) searchParams.set("per_page", params.per_page.toString());

  const url = `${STRAVA_CONFIG.apiBaseUrl}/athlete/activities${searchParams.toString() ? `?${searchParams}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token is invalid, clear stored tokens
      clearStoredTokens();
      throw new StravaApiError("Authentication expired. Please reconnect to Strava.", 401);
    }

    if (response.status === 429) {
      const resetTime = response.headers.get("X-RateLimit-Reset");
      const resetTimestamp = resetTime ? parseInt(resetTime) * 1000 : undefined;
      const message = resetTime
        ? `Rate limited. Try again after ${new Date(resetTimestamp!).toLocaleTimeString()}`
        : "Rate limited. Please try again later.";
      throw new StravaApiError(message, 429, resetTimestamp);
    }

    throw new StravaApiError(
      `Failed to fetch activities: ${response.status} ${response.statusText}`,
      response.status
    );
  }

  return await response.json();
}
