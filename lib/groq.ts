// Groq-compatible summarizer wrapper
import axios from 'axios';

export async function generateSummaryGroq(meeting: any) {
  const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
  const apiUrl = process.env.GROQ_API_URL || process.env.NEXT_PUBLIC_GROQ_API_URL || 'https://api.groq.ai/v1';

  if (!apiKey) {
    return `Summary (mock): Meeting "${meeting.title}" with ${meeting.attendees?.length ?? 0} attendees. Duration: ${meeting.duration} minutes. (Set GROQ_API_KEY to enable real Groq summaries.)`;
  }

  const prompt = `Write a concise meeting summary with key points, decisions and action items for the meeting:\n\nTitle: ${meeting.title}\nStart: ${meeting.start}\nEnd: ${meeting.end}\nAttendees: ${meeting.attendees?.map((a:any)=>a.email).join(', ')}\nDescription: ${meeting.description || 'N/A'}`;

  try {
    const resp = await axios.post(`${apiUrl}/chat/completions`, {
      model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400
    }, {
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      timeout: 20000
    });

    const data = resp.data;
    if (data?.choices && data.choices[0]?.message?.content) return data.choices[0].message.content;
    if (data?.output) return typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
    return JSON.stringify(data).slice(0, 800);
  } catch (err:any) {
    console.error('Groq summarizer error', err?.toString?.() || err);
    return `Summary (fallback): Meeting "${meeting.title}" — failed to fetch Groq summary.`;
  }
}
