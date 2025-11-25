import { getMockMeetings } from './mock';
import { getComposioMeetings } from './composio';
const adapter = process.env.MCP_ADAPTER || 'mock';
export async function fetchMeetingsForUser(userId: string) {
  if (adapter === 'mock') return getMockMeetings();
  if (adapter === 'composio') return getComposioMeetings({ userId });
  throw new Error('Unknown MCP_ADAPTER');
}
