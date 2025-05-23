export function timeAgo(currentDate: string): string {
  const date = new Date(currentDate)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals: Record<string, number> = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  for (const key in intervals) {
    const interval = Math.floor(seconds / intervals[key])
    if (interval >= 1) {
      return `${String(interval)} ${key}${interval !== 1 ? "s" : ""} ago`
    }
  }

  return "just now"
}
