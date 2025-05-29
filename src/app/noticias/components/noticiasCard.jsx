import Link from 'next/link';

export default function noticiasCard({ id, titulo, contenido, autor, imagen }) {
  return (
    <Link href={`/noticias/${id}`} className="block hover:shadow-lg transition-shadow">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {imagen && (
          <img
            src={imagen}
            alt={titulo}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{titulo}</h3>
          <p className="text-gray-600 line-clamp-2 mb-3">{contenido}</p>
          <p className="text-sm text-gray-500">Por: {autor}</p>
        </div>
      </div>
    </Link>
  );
}