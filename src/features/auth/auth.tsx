import { useAuth } from "@/features/auth/auth-context";
import { Button } from "@/components/ui/button";

export function Auth() {
  const { connect, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="text-center max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span>Connecting to Strava...</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Please wait while we complete the authorization process.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Connect Your Strava Account</h2>
        <p className="text-muted-foreground text-sm">
          Connect your Strava account to view your activity analytics and insights.
        </p>
      </div>

      <Button onClick={connect} size="lg" className="w-full">
        Connect to Strava
      </Button>

      <p className="text-xs text-muted-foreground mt-4">
        By connecting, you agree to share your Strava activity data with this application.
      </p>
    </div>
  );
}
