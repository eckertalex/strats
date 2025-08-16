import { Button } from "@/components/ui/button";
import { buildAuthorizeUrl } from "@/lib/oauth-utils";

export function Unauthorized() {
  const handleConnect = () => {
    try {
      const authorizeUrl = buildAuthorizeUrl();
      window.location.href = authorizeUrl;
    } catch (error) {
      console.error("Failed to build authorize URL:", error);
      throw new Error("Configuration error: Unable to connect to Strava");
    }
  };

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Connect Your Strava Account</h2>
        <p className="text-muted-foreground text-sm">
          Connect your Strava account to view your activity analytics and insights.
        </p>
      </div>

      <Button onClick={handleConnect} size="lg" className="w-full">
        Connect to Strava
      </Button>

      <p className="text-xs text-muted-foreground mt-4">
        By connecting, you agree to share your Strava activity data with this application.
      </p>
    </div>
  );
}
