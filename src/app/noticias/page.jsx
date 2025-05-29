import NewsCard from './components/NewsCard';
import Noticia from '@app/models/noticias';

async function getNoticias() {
  const res = await fetch('http://localhost:3000/noticias', { cache: 'no-store' });
  return res.json();
}

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Últimas Noticias</h1>
        
        {noticias.length === 0 ? (
          <p className="text-center text-gray-500">No hay noticias disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map((noticia) => (
              <NewsCard
                key={noticia._id}
                id={noticia._id}
                titulo={noticia.titulo}
                contenido={noticia.contenido}
                autor={noticia.autor}
                imagen={noticia.imagen}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}