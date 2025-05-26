import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import Usuario from "@/app/models/usuario";

export async function middleware(req) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // crear noticia solo debe estar disponibkle para los autores
  if (url.pathname.startsWith("/crear-noticia") && token.Usuario?.tipo !== "autor") {
    url.pathname = "/no-autorizado";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crear-noticia/:path*"],
};
