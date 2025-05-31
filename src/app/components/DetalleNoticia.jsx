'use client';

import { Container, Card, Badge, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddCommentButton from './botoncomentario';

export default function DetalleNoticia({ noticia, noticiaId, comentarios = [] }) {
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
        <Link href="/">
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

        



      <section className="mt-5">
        <h3>Comentarios</h3>

        <AddCommentButton noticiaId={noticiaId} />

        {comentarios.length === 0 ? (
          <p className="text-muted">Aún no hay comentarios.</p>
        ) : (
          comentarios.map((comentario) => (
            <div key={comentario._id} className="border rounded p-2 my-2">
              <strong>{comentario.autor?.nombre || 'Anónimo'}</strong> dijo:
              <p>{comentario.contenido}</p>
              <small className="text-muted">
                {new Date(comentario.fecha).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </section>


        <Card.Footer className="text-muted bg-white">
          Publicado el{' '}
          {new Date(noticia.createdAt || noticia.fecha).toLocaleDateString()}
        </Card.Footer>
      </Card>


    </Container>
  );
}
