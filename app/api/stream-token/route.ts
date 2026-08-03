// app/api/stream-token/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_API_SECRET!;

export async function GET() {
  try {
    // 1. Grab both the userId AND the active organization role from the session
    const {userId,orgRole} = await auth();
    
    if (!userId) {
      return new NextResponse('Unauthorized: Missing session.', { status: 401 });
    }

    // 2. Check if the user is an admin of the currently selected organization
    // Clerk sets this to 'org:admin' for organization administrators
    const isAdmin = orgRole === 'org:admin'; 
    
    if (!isAdmin) {
      return new NextResponse('Forbidden: Admin access required for this organization.', { status: 403 });
    }

    // 3. Initialize Stream SDK
    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    /* const {permissions}=await serverClient.listPermissions()
    console.log(permissions,"permissions") */

    await serverClient.partialUpdateUser({
      id: userId,
      set: { role: "admin" },
    });

    // 4. Generate a secure token expiring in 1 hour
    const issuedAt = Math.floor(Date.now() / 1000);
    const expirationTime = issuedAt + 3600;
    
    const token = serverClient.createToken(userId, expirationTime, issuedAt);

    return NextResponse.json({ 
      token, 
      apiKey 
    });
    
  } catch (error) {
    console.error('Error generating Stream token:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}