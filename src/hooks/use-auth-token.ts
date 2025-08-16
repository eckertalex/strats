import { useQuery } from "@tanstack/react-query";
import { STRAVA_CONFIG } from "@/lib/strava-config";
import { validateState } from "@/lib/oauth-utils";
import { storeTokens } from "@/lib/token-manager";
import type { UseAuthTokenParams, TokenResponse, StravaError } from "@/types";

export function useAuthToken({ code, state, enabled }: UseAuthTokenParams) {
  return useQuery({
    queryKey: ["strava-token", code, state],
    queryFn: async (): Promise<TokenResponse> => {
      if (!code) {
        throw new Error("Authorization code is missing");
      }

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
    },
    enabled,
    retry: false,
    staleTime: Infinity,
  });
}
