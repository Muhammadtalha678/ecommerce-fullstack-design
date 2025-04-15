import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')
    const { pathname } = request.nextUrl

    const authPaths = ['/login', '/register', '/verifyEmail']
    const protectedPaths = ['/profile', '/cart']

    if (token && authPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/login', '/register', '/verifyEmail']
}

