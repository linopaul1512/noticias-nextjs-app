import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: 'Noticias App',
  description: 'Plataforma de noticias con Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          integrity="sha384..."
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}


