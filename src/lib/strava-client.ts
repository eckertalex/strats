import { clearStoredToken, getStoredToken } from "@/features/auth/token-manager";

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

export async function stravaFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  if (!token?.access_token) {
    throw new StravaApiError("No valid access token found. Please reconnect to Strava.");
  }

  const response = await fetch(`https://www.strava.com/api/v3${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearStoredToken();
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

  return response.json();
}
