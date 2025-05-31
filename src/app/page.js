'use client';
import Navbar from './components/navbar';
import Footer from './components/footer';
import NoticiaCard from './components/tarjetanoticias';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch('/api/noticias')
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((err) => console.error('Error al cargar noticias:', err));
  }, []);

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h1 className="display-4 text-center">Últimas Noticias</h1>
            <p className="text-center text-muted">Mantente informado con lo último</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col className="text-end">
            <Link href="/noticias">
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
      <Footer />
    </>
  );
}
