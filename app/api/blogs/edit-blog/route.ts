import { adminClient } from "@/app/lib/sanity/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1. This will now parse properly because we are sending JSON again
    const { blogId, cardKey, newData } = await request.json();
    
    if (!blogId || !cardKey || !newData) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }


    // 2. Commit the clean text edits straight to Sanity
    const result = await adminClient
      .patch(blogId)
      .set({
        [`card[_key == "${cardKey}"]`]: newData
      })
      .commit({ autoGenerateArrayKeys: false });

    return NextResponse.json({ success: true, result });

  } catch (err: any) {
    console.error("Patch error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}