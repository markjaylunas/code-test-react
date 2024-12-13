import { formatDistanceToNow } from "date-fns";

export function getTimeAgo(timestamp: string) {
  const date = new Date(timestamp);
  const formattedTime = formatDistanceToNow(date, {
    addSuffix: true,
  });
  return formattedTime;
}
