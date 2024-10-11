// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected routes
const protectedRoutes = ["/create-event", "/create-event/*"];

export async function middleware(req: NextRequest) {
    // Check if the request is for a protected route
    const pathname = req.nextUrl.pathname;
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    if (!isProtected) {
        // If not a protected route, continue
        return NextResponse.next();
    }

    // Retrieve the token using NextAuth's getToken
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        // If no token, redirect to the sign-in page
        const signInUrl = new URL("/api/auth/signin", req.url);
        signInUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(signInUrl);
    }

    // If token exists, allow access
    return NextResponse.next();
}

// Specify the matcher for the middleware
export const config = {
    matcher: ["/create-event/:path*", "/another-protected-route/:path*"],
};
