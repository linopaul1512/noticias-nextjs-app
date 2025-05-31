"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Container, Alert } from "react-bootstrap";

export default function Registro() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    nombreusuario: "",
    correo: "",
    telefono: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = {
      ...form,
      role: "lector", 
    };

    try {
      const res = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al registrar");
      }

      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">Registro de Lector</h2>
      {error && <Alert variant="danger">{error}</Alert>}

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
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control name="nombreusuario" onChange={handleChange} required />
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
          <Form.Control type="password" name="contrasena" onChange={handleChange} required minLength={6} />
        </Form.Group>

        <Button type="submit" className="mt-2" variant="primary" block="true">
          Registrarse
        </Button>
      </Form>
    </Container>
  );
}
