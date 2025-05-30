import Link from 'next/link';
import { Card, Badge } from 'react-bootstrap';

export default function NoticiaCard({ noticia }) {
  return (
    <Card className="h-100 shadow-sm noticia-card">
      {noticia.imagen && (
        <Card.Img 
          variant="top" 
          src={noticia.imagen} 
          alt={noticia.titular}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body>
        <Badge bg="secondary" className="mb-2 categoria-badge">
          {noticia.categoría}
        </Badge>
        <Card.Title>{noticia.titular}</Card.Title>
        <Card.Text className="text-truncate">{noticia.descripcion}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white">
        <Link href={`/noticias/${noticia._id}`} passHref>
          <button className="btn btn-outline-primary">Leer más</button>
        </Link>
      </Card.Footer>
    </Card>
  );
}