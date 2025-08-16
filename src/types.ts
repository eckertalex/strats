export type TokenResponse = {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: Athlete;
};

export type Athlete = {
  id: number;
  username: string;
  /** Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail"  */
  resource_state: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  /** The athlete's sex. May take one of the following values: M, F */
  sex: string;
  /** Deprecated. Use summit field instead. Whether the athlete has any Summit subscription. */
  premium: boolean;
  /** Whether the athlete has any Summit subscription. */
  summit: boolean;
  /** "2018-08-07T21:10:07Z" */
  created_at: string;
  /** "2025-08-20T18:56:36Z" */
  updated_at: string;
  badge_type_id: number;
  weight: number;
  /** url */
  profile_medium: string;
  /** url */
  profile: string;
  friend: null;
  follower: null;
};

export type SportType =
  | "AlpineSki"
  | "BackcountrySki"
  | "Badminton"
  | "Canoeing"
  | "Crossfit"
  | "EBikeRide"
  | "Elliptical"
  | "EMountainBikeRide"
  | "Golf"
  | "GravelRide"
  | "Handcycle"
  | "HighIntensityIntervalTraining"
  | "Hike"
  | "IceSkate"
  | "InlineSkate"
  | "Kayaking"
  | "Kitesurf"
  | "MountainBikeRide"
  | "NordicSki"
  | "Pickleball"
  | "Pilates"
  | "Racquetball"
  | "Ride"
  | "RockClimbing"
  | "RollerSki"
  | "Rowing"
  | "Run"
  | "Sail"
  | "Skateboard"
  | "Snowboard"
  | "Snowshoe"
  | "Soccer"
  | "Squash"
  | "StairStepper"
  | "StandUpPaddling"
  | "Surfing"
  | "Swim"
  | "TableTennis"
  | "Tennis"
  | "TrailRun"
  | "Velomobile"
  | "VirtualRide"
  | "VirtualRow"
  | "VirtualRun"
  | "Walk"
  | "WeightTraining"
  | "Wheelchair"
  | "Windsurf"
  | "Workout"
  | "Yoga";

export type SummaryActivity = {
  id: number;
  name: string;
  /** meters */
  distance: number;
  /** seconds */
  moving_time: number;
  /** seconds */
  elapsed_time: number;
  /** meters */
  total_elevation_gain: number;
  sport_type: SportType;
  /** ISO 8601 */
  start_date: string;
  start_date_local: string;
  timezone: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  workout_type?: number;
  /** m/s */
  average_speed: number;
  /** m/s */
  max_speed: number;
  average_cadence?: number;
  average_watts?: number;
  weighted_average_watts?: number;
  kilojoules?: number;
  device_watts?: boolean;
  has_heartrate: boolean;
  average_heartrate?: number;
  max_heartrate?: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high?: number;
  elev_low?: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score?: number;
};

export type StravaError = {
  message: string;
  errors?: Array<{
    resource: string;
    field: string;
    code: string;
  }>;
};

export type ActivitiesParams = {
  /** epoch timestamp */
  before?: number;
  /** epoch timestamp */
  after?: number;
  page?: number;
  per_page?: number;
};

export type UseAuthTokenParams = {
  code: string | null;
  state: string | null;
  enabled: boolean;
};
