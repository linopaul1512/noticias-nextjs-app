'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Comentario from '../models/comentario';
import Noticia from '../models/noticia';

export default function AddCommentButton({ noticiaId }) {
  const [open, setOpen] = useState(false);
  const [texto, setTexto] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/comentarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idnoticia: noticiaId, texto })
    });
    setTexto('');
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Nuevo comentario</button>
      {open && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <textarea
              value={texto}
              onChange={e => setTexto(e.target.value)}
              placeholder="Escribe tu comentario"
              required
            />
            <button type="submit">Enviar</button>
            <button type="button" onClick={() => setOpen(false)}>Cerrar</button>
          </form>
        </div>
      )}
    </>
  );
}
