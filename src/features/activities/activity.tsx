import { Activity as ActivityIcon, Calendar as CalendarIcon } from "lucide-react";

import { formatDistance, formatDuration, formatDate } from "@/lib/formatters";
import type { SummaryActivity } from "@/types";

export type ActivityProps = {
  activity: SummaryActivity;
};

export function Activity({ activity }: ActivityProps) {
  return (
    <div key={activity.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-medium">{activity.name}</h4>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <ActivityIcon className="h-3 w-3" />
              {activity.sport_type}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              {formatDate(activity.start_date_local)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Distance</div>
          <div className="font-medium">{formatDistance(activity.distance)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Time</div>
          <div className="font-medium">{formatDuration(activity.moving_time)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Elevation</div>
          <div className="font-medium">{Math.round(activity.total_elevation_gain)}m</div>
        </div>
      </div>

      {(activity.kudos_count > 0 || activity.comment_count > 0) && (
        <div className="flex items-center gap-4 mt-3 pt-3 border-t text-sm text-muted-foreground">
          {activity.kudos_count > 0 && <span>👍 {activity.kudos_count}</span>}
          {activity.comment_count > 0 && <span>💬 {activity.comment_count}</span>}
        </div>
      )}
    </div>
  );
}
