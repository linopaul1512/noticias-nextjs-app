'use client';

import { useRouter } from 'next/navigation';


export default function TarjetaNoticias({ noticia }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/noticia/${noticia._id}`);
  };

  return (
    <div className="card h-100" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img
        src={noticia.imagen}
        className="card-img-top"
        alt={noticia.titular}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{noticia.titular}</h5>
        <p className="card-text">{noticia.descripcion}</p>
      </div>
    </div>
  );
}
