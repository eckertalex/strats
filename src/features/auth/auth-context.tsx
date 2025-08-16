import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";

import { exchangeToken, getAuthUrl } from "@/features/auth/auth-api";
import { useAuthToken } from "@/features/auth/use-auth-token";
import type { Athlete } from "@/types";

type AuthContextType = {
  user?: Athlete;
  accessToken?: string;
  isLoading: boolean;
  error?: string;
  connect: () => void;
  disconnect: () => void;
  clearError: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { token, setToken, clearToken } = useAuthToken();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const urlError = urlParams.get("error");

      if (urlError) {
        setError(`OAuth error: ${urlError}`);
        setIsLoading(false);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      if (code && !hasProcessedRef.current) {
        hasProcessedRef.current = true;

        try {
          const data = await exchangeToken(code);
          setToken(data);
          setError(undefined);
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error("Token exchange failed:", error);
          setError(error instanceof Error ? error.message : "Failed to authenticate with Strava");
        } finally {
          setIsLoading(false);
        }
      } else if (!code) {
        setIsLoading(false);
      }
    };

    handleOAuthCallback();
  }, [setToken]);

  const connect = () => {
    setError(undefined);
    setIsLoading(false);
    hasProcessedRef.current = false;
    window.location.href = getAuthUrl();
  };

  const disconnect = () => {
    clearToken();
    setError(undefined);
    setIsLoading(false);
    hasProcessedRef.current = false;
  };

  const clearError = () => {
    setError(undefined);
  };

  const value = {
    user: token?.athlete,
    accessToken: token?.access_token,
    isLoading,
    error,
    connect,
    disconnect,
    clearError,
    isAuthenticated: !!token?.access_token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
