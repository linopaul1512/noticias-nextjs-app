import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, Card, Spinner, Alert, Badge, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function DetalleNoticiaPage() {
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchNoticia = async () => {
      try {
        const response = await fetch(`/api/noticias/${id}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Error al cargar noticia');
        
        setNoticia(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={() => router.push('/noticias')}>
          Volver al listado
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Head>
        <title>{noticia.titular}</title>
        <meta name="description" content={noticia.descripcion} />
      </Head>

      <div className="text-end mb-3">
        <Link href="/noticias" passHref>
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
          <Badge bg="info" className="mb-3">{noticia.categoría}</Badge>
          <Card.Title as="h1" className="display-5 mb-3">{noticia.titular}</Card.Title>
          <Card.Subtitle className="mb-4 text-muted">{noticia.descripcion}</Card.Subtitle>
          
          <Card.Text className="fs-5" style={{ whiteSpace: 'pre-line' }}>
            {noticia.cuerpo}
          </Card.Text>
        </Card.Body>
        
        <Card.Footer className="text-muted bg-white">
          Publicado el {new Date(noticia.createdAt).toLocaleDateString()}
        </Card.Footer>
      </Card>
    </Container>
  );
}