'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import NoticiaPrincipal from './components/noticiaprincipal';
import TarjetaNoticias from './components/tarjetanoticias';
import NoticiasCard from './noticias/components/noticiasCard';
import axios from 'axios';

export default function HomePage() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1 py-4">
        <Container className="mb-5">
          <Row className="g-4 align-items-center">
            <Col lg={8}>
              <Badge bg="primary" className="mb-3">{noticiaPrincipal.categoría}</Badge>
              <h1 className="display-4 mb-3">{noticiaPrincipal.titular}</h1>
              <p className="lead">{noticiaPrincipal.descripcion}</p>
              <Link 
                href={`/noticias/${noticiaPrincipal._id}`} 
                className="btn btn-primary btn-lg"
              >
                Leer más
              </Link>
            </Col>
            <Col lg={4}>
              <div className={styles.noticiaPrincipalImagen}>
                <Image
                  src={noticiaPrincipal.imagen || '/images/placeholder-noticia.jpg'}
                  alt={noticiaPrincipal.titular}
                  width={600}
                  height={400}
                  className="img-fluid rounded shadow"
                  priority
                />
              </div>
            </Col>
          </Row>
        </Container>

        <Container className="my-5">
          <h2 className="text-center mb-5">Más Noticias</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {otrasNoticias.map((noticia) => (
              <Col key={noticia._id}>
                <NoticiaCard noticia={noticia} />
              </Col>
            ))}
          </Row>
          
          <div className="text-center mt-5">
            <Link href="/noticias" className="btn btn-outline-primary">
              Ver todas las noticias
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
