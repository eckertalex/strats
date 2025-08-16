import type { TokenResponse } from "../types";

const STORAGE_KEY = "strava_tokens";

export function getStoredTokens(): TokenResponse | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const tokens: TokenResponse = JSON.parse(stored);

    // Check if token is expired (with 5 minute buffer)
    const now = Math.floor(Date.now() / 1000);
    if (tokens.expires_at && tokens.expires_at < now + 300) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return tokens;
  } catch (error) {
    console.error("Error getting stored tokens:", error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function storeTokens(tokens: TokenResponse): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

export function clearStoredTokens(): void {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem("strava_oauth_state");
}
