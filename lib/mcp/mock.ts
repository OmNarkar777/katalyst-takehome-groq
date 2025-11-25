export async function fetchMeetingsForUser(userId: string) {
  const now = new Date();

  const upcoming = [...Array(5)].map((_, i) => ({
    id: `up-${i}`,
    title: `Upcoming Meeting ${i + 1}`,
    start: now.toISOString(),
    end: new Date(now.getTime() + 45 * 60000).toISOString(),
    duration: 45,
    attendees: [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Doe", email: "jane@example.com" }
    ],
    description: "Discussion about project updates",
    calendarId: "mock-calendar"
  }));

  const past = [...Array(5)].map((_, i) => ({
    id: `past-${i}`,
    title: `Past Meeting ${i + 1}`,
    start: new Date(now.getTime() - (i + 1) * 86400000).toISOString(),
    end: new Date(now.getTime() - (i + 1) * 86400000 + 30 * 60000).toISOString(),
    duration: 30,
    attendees: [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Doe", email: "jane@example.com" }
    ],
    description: "Summary of past meeting",
    calendarId: "mock-calendar"
  }));

  return { upcoming, past };
}
