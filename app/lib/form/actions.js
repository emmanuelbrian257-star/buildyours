// app/actions.ts
'use server'

import { useClientAdmin } from "@/hooks/ClientAdmin";
import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import { auth } from '@clerk/nextjs/server';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

// Ensure Client is only instantiated if keys exist
if (!apiKey || !apiSecret) {
  throw new Error("Stream API keys are missing from environment variables.");
}
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

export async function handleFormSubmission(formData: FormData) {
  const message = formData.get('message') as string;
  const email = formData.get('email') as string;
  const number = formData.get("phonenumber") as string;
  const file = formData.get('attachment') as File;

  

  
  

  const clientId = email.replace(/[^a-zA-Z0-9_-]/g, '_');

  try {

    // 1. Create or update the user
    await serverClient.upsertUsers([{
      id: clientId,
      role: 'user',
      name: email,
      extraData: {
        phone: number
      }
    }]);

    // 2. Initialize the channel
    const channelId = `support_${clientId}`;
    const channel = serverClient.channel("messaging", channelId, {
      created_by_id: clientId,
      members: [clientId, "user_3FgX1EPAZgNRw39IaQsPUKLXC3s"],
    });

    await channel.create();

    // Initialize attachments array
    let attachments: any[] = [];

    // 3. Handle the File Upload to Stream CDN
    if (file && file.size > 0 && file.name !== 'undefined') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload the file buffer directly to Stream Chat CDN
      const uploadResponse = await channel.sendFile(
        buffer,
        file.name,
        file.type, // "application/pdf",
        { id: clientId, role: 'user' }
      );

      // Push the uploaded file URL into the attachments payload
      attachments.push({
        type: 'file',
        file_size: file.size,
        title: file.name,
        asset_url: uploadResponse.file, // Stream returns the public URL here
        mime_type: file.type
      });
    }

    console.log('sendint attachments')

    // 4. Send the message along with any attachments
    await channel.sendMessage({
      text: message,
      user_id: clientId,
      attachments: attachments // Will be empty if no file was uploaded
    });

    // Return plain objects from Server Actions
    return { success: true, message: 'Message sent successfully!' };

  } catch (error) {
    console.error("Stream Chat error", error);
    return { success: false, error: 'Failed to route message' };
  }
}
