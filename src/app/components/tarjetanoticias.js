'use client';
import Link from 'next/link';

export default function TarjetaNoticias({ noticia }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
      {noticia.imagen && (
        <img 
          src={noticia.imagen} 
          alt={noticia.titular} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2">{noticia.titular}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{noticia.descripcion}</p>
        <div className="mt-auto">
          <Link 
            href={`/noticia/${noticia._id}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Leer más
          </Link>
        </div>
      </div>
    </div>
  );
}