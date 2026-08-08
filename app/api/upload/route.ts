import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const packId = formData.get("packId") as string;
    const type = formData.get("type") as string;
    const bpm = Number(formData.get("bpm"));
    const key = formData.get("key") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");

    if (!file || !title) {
      return NextResponse.json({ error: "缺少必要字段" }, { status: 400 });
    }

    // 上传到 Supabase Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("audio-previews")
      .upload(fileName, file);

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("audio-previews").getPublicUrl(fileName);

    // 写入数据库
    const { data, error } = await supabase
      .from("samples")
      .insert({
        title,
        pack_id: packId || null,
        creator_id: user.id,
        type,
        bpm,
        musical_key: key,
        tags,
        audio_url: publicUrl,
        preview_url: publicUrl,
        is_published: false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
