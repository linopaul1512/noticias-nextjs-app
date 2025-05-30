"use client";
import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

export default function RegistroPage() {
  const [form, setForm] = useState({});
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/registro", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setMensaje(data.message);
  };

  return (
    <Container>
      <h2>Registro de Lector</h2>
      {mensaje && <Alert>{mensaje}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="nombre" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Apellido</Form.Label>
          <Form.Control name="apellido" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Nombre Usuario</Form.Label>
          <Form.Control name="nombreUsuario" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" name="correo" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control name="telefono" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="contrasena" onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" className="mt-2">Registrarse</Button>
      </Form>
    </Container>
  );
}