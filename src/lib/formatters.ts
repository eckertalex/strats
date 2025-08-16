const kilometerFormatter = new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "kilometer",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatDistance(meters: number): string {
  const km = meters / 1000;
  return kilometerFormatter.format(km);
}

const hourFormatter = new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "hour",
  unitDisplay: "short",
});

const minuteFormatter = new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "minute",
  unitDisplay: "short",
});

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hourFormatter.format(hours)} ${minuteFormatter.format(minutes)}`;
  }

  if (hours > 0) {
    return hourFormatter.format(hours);
  }

  return minuteFormatter.format(minutes);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
