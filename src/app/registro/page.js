"use client";
import { useState } from "react";
import { Form, Button, Container, Alert, Card, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function RegistroPage() {
  const [form, setForm] = useState({});
  const [mensaje, setMensaje] = useState({ text: "", variant: "" });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const res = await fetch("/api/auth/registro", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMensaje({ text: "¡Registro exitoso! Redirigiendo...", variant: "success" });
        setTimeout(() => window.location.href = "/login", 2000);
      } else {
        setMensaje({ text: data.message || "Error en el registro", variant: "danger" });
      }
    } catch (error) {
      setMensaje({ text: "Error de conexión", variant: "danger" });
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Registro de Lector</h2>
                <p className="text-muted">Únete a nuestra comunidad</p>
              </div>

              {mensaje.text && (
                <Alert variant={mensaje.variant} className="text-center">
                  {mensaje.text}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control 
                        name="nombre" 
                        onChange={handleChange} 
                        required 
                        placeholder="Ej: María"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu nombre
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control 
                        name="apellido" 
                        onChange={handleChange} 
                        required 
                        placeholder="Ej: González"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu apellido
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control 
                    name="nombreUsuario" 
                    onChange={handleChange} 
                    required 
                    placeholder="Ej: maria2023"
                  />
                  <Form.Control.Feedback type="invalid">
                    Elige un nombre de usuario
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="correo" 
                    onChange={handleChange} 
                    required 
                    placeholder="Ej: ejemplo@correo.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa un correo válido
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control 
                    name="telefono" 
                    onChange={handleChange} 
                    required 
                    placeholder="Ej: 3001234567"
                  />
                  <Form.Control.Feedback type="invalid">
                    Proporciona tu teléfono
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="contrasena" 
                    onChange={handleChange} 
                    required 
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                  />
                  <Form.Control.Feedback type="invalid">
                    La contraseña debe tener al menos 6 caracteres
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    className="fw-bold"
                  >
                    Registrarse
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-muted">
                    ¿Ya tienes cuenta?{" "}
                    <Link href="/login" className="text-decoration-none fw-bold">
                      Inicia Sesión
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}