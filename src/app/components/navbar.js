'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Noticias App</Link>
        
        <div className="flex space-x-4">
          {user?.role === 'autor' && (
            <Link 
              href="/crear-noticia" 
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Crear Noticia
            </Link>
          )}
          
          {user ? (
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/login');
              }}
              className="hover:underline"
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link href="/login" className="hover:underline">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
}