import { NextRequest, NextResponse } from "next/server";
import { fetchUser } from "./lib/api/fetchUser";
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl
    // console.log(token);

    const authPaths = ['/login', '/register', '/verifyEmail']
    const protectedPaths = ['/profile', '/cart', '/admin']


    if (token && authPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    // console.log(protectedPaths.includes(pathname));
    if (protectedPaths.includes(pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        try {
            const userData = await fetchUser(token)
            console.log(userData);

            if (!userData) {
                throw new Error('No user data returned');
            }
            // Redirect if user is not admin but trying to access admin routes
            if (pathname.startsWith('/admin') && userData.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url))
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url))

        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/login', '/register', '/verifyEmail', '/profile', '/cart', '/admin/:path*']
}

