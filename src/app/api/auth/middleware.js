import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
  const token = request.cookies.get('sessionToken')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/crear-noticia')) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.tipo !== 'autor') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}