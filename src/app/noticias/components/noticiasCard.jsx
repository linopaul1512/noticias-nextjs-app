import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

export default function NoticiasCard({ id, titulo, contenido, autor, imagen }) {
  return (
    <Card className="h-100 shadow-sm">
      {imagen && (
        <Card.Img 
          variant="top" 
          src={imagen} 
          alt={titulo}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-truncate">
          {contenido}
        </Card.Text>
        <Card.Text className="text-muted mt-auto">
          <small>Por: {autor}</small>
        </Card.Text>
        <Link href={`/noticias/${id}`} passHref>
          <Button variant="outline-primary" className="mt-3">Leer más</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}