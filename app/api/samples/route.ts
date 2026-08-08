import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const tag = searchParams.get("tag");
  const type = searchParams.get("type");

  const supabase = await createClient();
  let builder = supabase
    .from("samples")
    .select("*, sample_packs(title)")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (tag) {
    builder = builder.contains("tags", [tag]);
  }
  if (type) {
    builder = builder.eq("type", type);
  }
  if (query) {
    builder = builder.ilike("title", `%${query}%`);
  }

  const { data, error } = await builder.limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
