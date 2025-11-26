import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { message, meetingId } = req.body;

  const { error } = await supabase
    .from("logs")
    .insert({ message, meeting_id: meetingId });

  if (error) return res.status(500).json({ error });

  return res.status(200).json({ success: true });
}
