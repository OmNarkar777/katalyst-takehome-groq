import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) { try { const event = req.body; console.log('webhook event', event?.type || 'unknown'); res.status(200).json({ ok: true }); } catch (err:any) { console.error('webhook error', err); res.status(500).json({ error: err.message || 'Webhook error' }); } }
