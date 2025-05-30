import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Noticias App",
  description: "Autenticación con Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`container mt-4 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}

