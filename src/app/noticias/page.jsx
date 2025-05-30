import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import NoticiaCard from './components/noticiasCard';
import Link from 'next/link';

async function getNoticias() {
  try {
    const res = await fetch('http://localhost:3000/api/noticias');
    if (!res.ok) throw new Error('Error al cargar noticias');
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 text-center">Últimas Noticias</h1>
          <p className="text-center text-muted">Mantente informado con lo último</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="text-end">
          <Link href="/noticias/nueva">
            <Button variant="success">Crear Nueva Noticia</Button>
          </Link>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {noticias.map((noticia) => (
          <Col key={noticia._id}>
            <NoticiaCard noticia={noticia} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}