import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error });

  return res.status(200).json(data);
}
