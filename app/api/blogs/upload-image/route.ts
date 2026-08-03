import { adminClient } from "@/app/lib/sanity/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }



    // Process file binary array buffer streams
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload directly to Sanity Assets pipeline
    const uploadedAsset = await adminClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    });

    // Return the clean, newly generated image asset _id string back to frontend
    return NextResponse.json({ success: true, assetId: uploadedAsset._id });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}