import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Only apply middleware to admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('adminToken')?.value;
    
    // If no token, redirect to login page
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user is admin
      if (!decoded.isAdmin) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
      
      // If trying to access /admin/login while authenticated, redirect to dashboard
      if (pathname === '/admin/login') {
        const dashboardUrl = new URL('/admin', request.url);
        return NextResponse.redirect(dashboardUrl);
      }
      
    } catch (error) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      // Clear the invalid token
      response.cookies.delete('adminToken');
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};