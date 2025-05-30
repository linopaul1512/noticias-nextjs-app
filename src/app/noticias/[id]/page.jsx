'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Comentarios from '@/app/components/comentarios';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

export default function NoticiaCompleta() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const res = await fetch(`/api/noticias/${id}`);
        const data = await res.json();
        setNoticia(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticia();
  }, [id]);

  if (loading) return <p className="text-center my-8">Cargando...</p>;
  if (!noticia) return <p className="text-center my-8">Noticia no encontrada</p>;

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{noticia.titular}</h1>
          
          <div className="flex items-center mb-6 text-gray-500">
            <span>{new Date(noticia.fecha).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{noticia.categoría}</span>
          </div>

          {noticia.imagen && (
            <img 
              src={noticia.imagen} 
              alt={noticia.titular} 
              className="w-full h-auto mb-8 rounded-lg"
            />
          )}

          <div className="prose max-w-none">
            <p className="text-lg mb-4">{noticia.descripcion}</p>
            <p className="whitespace-pre-line">{noticia.cuerpo}</p>
          </div>
        </article>

        <Comentarios noticiaId={id} />
      </main>
      <Footer />
    </div>
  );
}