export const STRAVA_CONFIG = {
  clientId: import.meta.env.VITE_STRAVA_CLIENT_ID,
  redirectUri: `${window.location.origin}/login`,
  scope: "activity:read_all",
  authUrl: "https://www.strava.com/oauth/authorize",
  tokenExchangeUrl: "https://strats.eckertalex.dev/exchange",
  apiBaseUrl: "https://www.strava.com/api/v3",
} as const;
