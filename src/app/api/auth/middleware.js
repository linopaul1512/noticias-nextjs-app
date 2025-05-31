import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  const token = request.cookies.get('sessionToken')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/crear-noticia')) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      // Verificar que el usuario sea de tipo "autor"
      if (user.role !== 'autor') {
        return NextResponse.redirect(new URL('/no-autorizado', request.url), {
          status: 403,
        });
      }
      return NextResponse.next();

    } catch (err) {
      return NextResponse.redirect(new URL('/login', request.url), {
        status: 401,
      });
    }
  }

  return NextResponse.next();
}
