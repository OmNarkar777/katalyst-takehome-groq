import { fetchMeetingsForUser as mockFetch } from "./mock";
import { getComposioMeetings } from "./composio";

const adapter = process.env.MCP_ADAPTER || "mock";

// Unified MCP adapter fetcher
export async function fetchMeetingsForUser(userId: string) {
  if (adapter === "mock") {
    return mockFetch(userId);
  }
  if (adapter === "composio") {
    return getComposioMeetings(userId);
  }

  throw new Error("Unknown MCP_ADAPTER: " + adapter);
}
