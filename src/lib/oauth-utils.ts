import { STRAVA_CONFIG } from "./strava-config";
import { storeTokens } from "./token-manager";
import type { TokenResponse, StravaError } from "@/types";

export function buildAuthorizeUrl(): string {
  if (!STRAVA_CONFIG.clientId) {
    throw new Error("Strava client ID is not configured");
  }

  const state = crypto.randomUUID();

  // Store state in sessionStorage for CSRF validation
  // Note: In production, consider storing this server-side for better security
  sessionStorage.setItem("strava_oauth_state", state);

  const searchParams = new URLSearchParams({
    client_id: STRAVA_CONFIG.clientId,
    redirect_uri: STRAVA_CONFIG.redirectUri,
    response_type: "code",
    scope: STRAVA_CONFIG.scope,
    state,
  });

  return `${STRAVA_CONFIG.authUrl}?${searchParams}`;
}

export function validateState(state: string | null): boolean {
  const storedState = sessionStorage.getItem("strava_oauth_state");
  return state === storedState && state !== null;
}

export function clearUrlParams(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  url.searchParams.delete("state");
  url.searchParams.delete("error");
  url.searchParams.delete("error_description");
  window.history.replaceState({}, document.title, url.toString());
}

export async function exchangeCodeForToken(
  code: string,
  state: string | null
): Promise<TokenResponse> {
  if (!validateState(state)) {
    throw new Error("Invalid state parameter. Possible CSRF attack.");
  }

  const tokenUrl = `${STRAVA_CONFIG.tokenExchangeUrl}?code=${encodeURIComponent(code)}`;

  const response = await fetch(tokenUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const errorData: StravaError = await response.json();
      errorMessage = errorData.message || errorMessage;

      if (errorData.errors?.length) {
        const details = errorData.errors.map((err) => `${err.field}: ${err.code}`).join(", ");
        errorMessage += ` (${details})`;
      }
    } catch {
      // Use default error message if JSON parsing fails
    }

    throw new Error(`Token exchange failed: ${errorMessage}`);
  }

  const tokenData = await response.json();
  storeTokens(tokenData);
  sessionStorage.removeItem("strava_oauth_state");

  return tokenData;
}
