import type { TokenResponse } from "@/types";

export const STRAVA_TOKEN_KEY = "strava_token";

export type StoredToken = TokenResponse & {
  stored_at: number;
};

export function getStoredToken(): StoredToken | null {
  try {
    const stored = localStorage.getItem(STRAVA_TOKEN_KEY);
    if (!stored) return null;

    const token: StoredToken = JSON.parse(stored);

    if (!isTokenValid(token)) {
      localStorage.removeItem(STRAVA_TOKEN_KEY);
      return null;
    }

    return token;
  } catch (error) {
    console.error("Error getting stored token:", error);
    localStorage.removeItem(STRAVA_TOKEN_KEY);
    return null;
  }
}

export function setStoredToken(token: TokenResponse): void {
  const tokenWithTimestamp: StoredToken = {
    ...token,
    stored_at: Date.now(),
  };
  localStorage.setItem(STRAVA_TOKEN_KEY, JSON.stringify(tokenWithTimestamp));
}

function isTokenValid(token: StoredToken | null): boolean {
  if (!token) return false;
  if (!token.expires_in) return true;

  const now = Date.now();
  const buffer = 5 * 60 * 1000;
  const expiresAt = token.expires_at * 1000;
  return now + buffer < expiresAt;
}

export function clearStoredToken(): void {
  localStorage.removeItem(STRAVA_TOKEN_KEY);
}
