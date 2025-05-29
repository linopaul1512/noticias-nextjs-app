import { Container, Row, Col, Spinner } from 'react-bootstrap';
import NoticiasCard from './components/noticiasCard';

async function getNoticias() {
  const res = await fetch('http://localhost:3000/api/noticias', { 
    cache: 'no-store' 
  });
  if (!res.ok) throw new Error('Error al cargar noticias');
  return res.json();
}

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 display-4">Últimas Noticias</h1>
      
      {noticias.length === 0 ? (
        <p className="text-center text-muted">No hay noticias disponibles</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {noticias.map((noticia) => (
            <Col key={noticia._id}>
              <NoticiasCard
                id={noticia._id}
                titulo={noticia.titulo}
                contenido={noticia.contenido}
                autor={noticia.autor}
                imagen={noticia.imagen}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}