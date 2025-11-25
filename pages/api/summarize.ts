import type { NextApiRequest, NextApiResponse } from 'next';
import { generateSummaryGroq } from '../../lib/groq';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { meeting } = req.body;
    if (!meeting) return res.status(400).json({ error: 'meeting required' });
    const summary = await generateSummaryGroq(meeting);
    res.status(200).json({ summary });
  } catch (err:any) { console.error('summarize error', err); res.status(500).json({ error: err.message || 'Failed to summarize' }); }
}
