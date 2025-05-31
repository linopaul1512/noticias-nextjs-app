'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';

export default function NuevaNoticiaPage() {
  const [formData, setFormData] = useState({
    titular: '',
    descripcion: '',
    cuerpo: '',
    categoria: '',
    imagen: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Debes iniciar sesión');

      const response = await fetch('/api/noticias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Error al crear noticia');

      setSuccess('Noticia creada exitosamente');
      setTimeout(() => {
        router.push(`/noticias/${data.noticia.id}`);
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="mb-4 text-center">Crear Nueva Noticia</h1>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3">
    <Form.Label>Título *</Form.Label>
    <Form.Control
      type="text"
      name="titular"
      value={formData.titular}
      onChange={handleChange}
      required
      placeholder="Título impactante de la noticia"
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Descripción breve *</Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      name="descripcion"
      value={formData.descripcion}
      onChange={handleChange}
      required
      placeholder="Resumen de la noticia (aparecerá en el listado)"
    />
    <Form.Text className="text-muted">Máximo 200 caracteres</Form.Text>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Cuerpo completo *</Form.Label>
    <Form.Control
      as="textarea"
      rows={8}
      name="cuerpo"
      value={formData.cuerpo}
      onChange={handleChange}
      required
      placeholder="Contenido detallado de la noticia (puedes usar Markdown)"
      className="font-monospace"
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Categoría *</Form.Label>
    <Form.Select
      name="categoria"
      value={formData.categoria}
      onChange={handleChange}
      required
    >
      <option value="">Selecciona una categoría</option>
      <option value="Regiones">Regiones</option>
      <option value="Deportes">Deportes</option>
      <option value="Sucesos">Sucesos</option>
      <option value="Economía">Economía</option>
    </Form.Select>
  </Form.Group>

  <Form.Group className="mb-4">
    <Form.Label>URL de la imagen destacada</Form.Label>
    <Form.Control
      type="url"
      name="imagen"
      value={formData.imagen}
      onChange={handleChange}
      placeholder="https://ejemplo.com/imagen.jpg"
    />
    <Form.Text className="text-muted">Opcional. Usa una imagen en formato 16:9 para mejor visualización</Form.Text>
  </Form.Group>

  <div className="d-grid gap-2">
    <Button 
      variant="primary" 
      type="submit" 
      disabled={loading}
      size="lg"
    >
      {loading ? (
        <>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          {' Publicando...'}
        </>
      ) : 'Publicar Noticia'}
    </Button>
  </div>
</Form>
        </Col>
      </Row>
    </Container>
  );
}