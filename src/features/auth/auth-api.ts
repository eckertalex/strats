import type { TokenResponse } from "@/types";

const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
const redirectUri = window.location.origin;
const scope = "activity:read_all";

export function getAuthUrl() {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scope,
    state: crypto.randomUUID(),
  });
  return `https://www.strava.com/oauth/authorize?${params}`;
}

export async function exchangeToken(code: string): Promise<TokenResponse> {
  const params = new URLSearchParams({
    code,
  });

  const response = await fetch(`https://strats.eckertalex.dev/exchange?${params}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`Failed to exchange token: ${response.status} ${errorText}`);
  }

  return await response.json();
}
