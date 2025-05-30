import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get('sessionToken')?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // crear noticia solo debe estar disponible para los autores
  if (url.pathname.startsWith("/crear-noticia") && token.Usuario?.tipo !== "autor") {
    url.pathname = "/no-autorizado";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crear-noticia/:path*"],
};

