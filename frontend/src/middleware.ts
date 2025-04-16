import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'
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
        if (!token || token.trim() === '') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        try {

            const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
            const { payload } = await jwtVerify(token, secret);
            console.log(payload);

            if (!payload || typeof payload !== 'object') throw new Error('Invalid token');
            if (!payload.role || !payload.id) throw new Error('Invalid token payload');

            if (pathname.startsWith('/admin') && payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            const err = error as Error
            console.error('Middleware error:', err.message);
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
