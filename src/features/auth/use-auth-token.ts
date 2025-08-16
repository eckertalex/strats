import { useEffect, useState } from "react";
import {
  getStoredToken,
  setStoredToken,
  clearStoredToken,
  STRAVA_TOKEN_KEY,
  type StoredToken,
} from "@/features/auth/token-manager";
import type { TokenResponse } from "@/types";

export function useAuthToken() {
  const [token, _setToken] = useState<StoredToken | null>(() => getStoredToken());

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STRAVA_TOKEN_KEY) {
        _setToken(getStoredToken());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setToken = (tokenResponse: TokenResponse) => {
    setStoredToken(tokenResponse);
    _setToken(getStoredToken());
  };

  const clearToken = () => {
    clearStoredToken();
    _setToken(null);
  };

  return {
    token,
    setToken,
    clearToken,
  };
}
