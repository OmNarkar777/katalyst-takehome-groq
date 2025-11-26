import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { meetingId, transcript } = req.body;

    // Mock summary (replace with actual Groq summary later)
    const summary = `Summary for meeting: ${meetingId}\nTranscript length: ${transcript?.length || 0}`;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from("logs")
      .insert({
        message: summary,
        meeting_id: meetingId || null,
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to save summary" });
    }

    return res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unexpected error" });
  }
}
