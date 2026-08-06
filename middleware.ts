import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from "next/server"

// Fixed the leading slashes and typos here
const isPublicRoute = createRouteMatcher([
  '/',
  '/blogs(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',
  '/studio(.*)'
])

const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
  // Destructure everything you need right here in ONE single call
  const { userId, sessionClaims, redirectToSignIn } = await auth()

  // 1. Protect Admin Routes
  if (isAdminRoute(req) && sessionClaims?.metadata?.role !== "admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url)
  }

  // 2. Protect Private Routes
  if (!isPublicRoute(req) && !userId) {
    return redirectToSignIn()
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|mp4|webp|png|glb|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
