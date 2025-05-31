import { Container, Card, Badge, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';

async function getNoticia(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/noticias/${id}`);
    if (!res.ok) throw new Error('Noticia no encontrada');
    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

export default async function DetalleNoticia({ params }) {
  const { id } = params;
  const noticia = await getNoticia(id);

  if (!noticia) {
    return (
      <Container className="py-5">
        <Alert variant="danger">No se pudo cargar la noticia</Alert>
        <Link href="/noticias">
          <Button variant="secondary">Volver al listado</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="text-end mb-3">
        <Link href="/noticias">
          <Button variant="outline-secondary">← Volver al listado</Button>
        </Link>
      </div>

      <Card className="border-0 shadow">
        {noticia.imagen && (
          <Card.Img
            variant="top"
            src={noticia.imagen}
            alt={noticia.titular}
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        )}

        <Card.Body>
          <Badge bg="info" className="mb-3">
            {noticia.categoría || noticia.categoria}
          </Badge>
          <h1 className="display-5 mb-3">{noticia.titular}</h1>
          <p className="text-muted mb-4">{noticia.descripcion}</p>

          <div className="fs-5" style={{ whiteSpace: 'pre-line' }}>
            {noticia.cuerpo}
          </div>
        </Card.Body>

        <Card.Footer className="text-muted bg-white">
          Publicado el{' '}
          {new Date(noticia.createdAt || noticia.fecha).toLocaleDateString()}
        </Card.Footer>
      </Card>
    </Container>
  );
}
