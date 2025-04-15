import { NextRequest, NextResponse } from "next/server";
import { fetchUser } from "./lib/api/fetchUser";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const authPaths = ['/login', '/register', '/verify-email'];
    const protectedPaths = ['/profile', '/cart', '/admin'];

    // Redirect if already logged in and trying to access auth pages
    if (token && authPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Protect routes
    const isProtected = protectedPaths.some(path => pathname.startsWith(path));
    // console.log(protectedPaths.some(path => console.log(path)
    // ));

    if (isProtected) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        try {
            const userData = await fetchUser(token);

            if (!userData) {
                throw new Error('No user data returned');
            }

            // Admin role check
            if (pathname.startsWith('/admin') && userData.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url));
            }

        } catch (error) {
            console.log("Middleware error:", error);

            // Clear invalid token
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.set('token', '', {
                expires: new Date(0),
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/register',
        '/verify-email',
        '/profile',
        '/cart',
        '/admin/:path*'
    ]
};
