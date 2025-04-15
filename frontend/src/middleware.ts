import { NextRequest, NextResponse } from "next/server";
import { fetchUser } from "./lib/api/fetchUser";
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl
    // console.log(token);

    const authPaths = ['/login', '/register', '/verify-email']
    const protectedPaths = ['/profile', '/cart', '/admin']


    if (token && authPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    console.log(pathname);
    if (protectedPaths.includes(pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        try {
            const userData = await fetchUser(token)
            // console.log(userData);

            if (!userData) {
                throw new Error('No user data returned');
            }
            // Redirect if user is not admin but trying to access admin routes
            if (pathname.startsWith('/admin') && userData.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url))
            }
        } catch (error) {
            console.log("middle ware protecte error", error);
            const response = NextResponse.redirect(new URL('/login', request.url))
            response.cookies.set('token', '', {
                expires: new Date(0),
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            return response

        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/login', '/register', '/verify-email', '/profile', '/cart', '/admin/:path*']
}

