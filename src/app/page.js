'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import NoticiaPrincipal from './components/noticiaprincipal';
import TarjetaNoticias from './components/tarjetanoticias';
import NoticiasCard from './noticias/components/noticiasCard';
import DetalleNoticiaPage from './noticias/[id]/page';
import NuevaNoticiaPage from './noticias/page';
import axios from 'axios';

export default function HomePage() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await axios.get('/api/noticias');
        setNoticias(res.data);
      } catch (err) {
        console.error('Error al obtener noticias:', err);
      }
    };

    fetchNoticias();
  }, []);

  if (noticias.length === 0) {
    return <p className="text-center mt-5">Cargando noticias...</p>;
  }

  const noticiaPrincipal = noticias[0];
  const otrasNoticias = noticias.slice(1);
  

  return (
    <div>
      <Navbar />
      <main className="container mt-5">
        <section className="row mb-4">
          <div className="col-md-8">
            <h1 className="display-4">{noticiaPrincipal.titular}</h1>
            <p>{noticiaPrincipal.descipcion}</p>
          </div>
          <div className="col-md-4">
            <img
              src={noticiaPrincipal.imagen}
              className="img-fluid rounded"
              alt="Noticia principal"
            />
          </div>
        </section>

        <section className="row">
          {otrasNoticias.map((noticia) => (
            <div key={noticia._id} className="col-md-4 mb-4">
              <NoticiaCard noticia={noticia} />
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
