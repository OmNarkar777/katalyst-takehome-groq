import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchMeetingsForUser } from '../../lib/mcp';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = 'demo-user';
    const data = await fetchMeetingsForUser(userId);
    const normalize = (m:any) => ({ id: m.id, title: m.title, start: m.start, end: m.end, duration: m.duration, attendees: m.attendees || [], description: m.description || '', calendarId: m.calendarId || null });
    res.status(200).json({ upcoming: (data.upcoming || []).map(normalize), past: (data.past || []).map(normalize) });
  } catch (err:any) { console.error('meetings error', err); res.status(500).json({ error: err.message || 'Failed to fetch meetings' }); }
}
