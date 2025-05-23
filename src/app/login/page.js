"use client";
import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ correo, contrasena }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <Container>
      <h2>Iniciar Sesión</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        </Form.Group>
        <Button type="submit" className="mt-3">Entrar</Button>
      </Form>
    </Container>
  );
}
