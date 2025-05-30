import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export function middleware(request) {
  const token = request.cookies.get('sessionToken')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/crear-noticia')) {
    const user = token ? jwt.decode(token) : null;

    if (!user || user.role !== 'autor') {
      return NextResponse.redirect(new URL('/no-autorizado', request.url), {
        status: 403,
      });
    }
  }

  return NextResponse.next();
}