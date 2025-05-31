'use client';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function AddCommentButton({ noticiaId }) {
  const [showModal, setShowModal] = useState(false);
  const [contenido, setContenido] = useState('');
  const router = useRouter();

  const enviarComentario = async () => {
    try {
       const token = localStorage.getItem('token'); 


        const res = await fetch('/api/comentario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          noticiaId,
          contenido,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setContenido('');
        setShowModal(false);
        router.refresh();
      } else {
        console.error('Error al enviar comentario:', data.error);
        alert(data.error || 'No se pudo guardar el comentario');
      }
    } catch (err) {
      console.error('Error en el envío:', err);
      alert('Error al guardar el comentario');
    }
  };
  return (
     <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Nuevo Comentario
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="comentarioContenido">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={enviarComentario}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}