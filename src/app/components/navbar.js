"use client";

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          NoticiasAPP
        </Link>
        <div className="flex space-x-4">
          <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">
            Iniciar Sesión
          </Link>
          <Link href="/registro" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}
