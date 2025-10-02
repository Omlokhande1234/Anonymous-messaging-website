import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/auth/signin', 
    '/auth/signup', 
    '/', 
    '/auth/verify/:path*'
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access auth pages or home page
  if (
    token &&
    (url.pathname.startsWith('/auth/signin') ||
      url.pathname.startsWith('/auth/signup') ||
      url.pathname.startsWith('/auth/verify') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to signin if the user is not authenticated
  // and trying to access protected routes
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}
