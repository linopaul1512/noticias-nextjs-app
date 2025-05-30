"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registro() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = {
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      nombreusuario: e.target.nombreusuario.value,
      correo: e.target.correo.value,
      telefono: e.target.telefono.value,
      contrasena: e.target.contrasena.value,
      tipo: "lector", // Campo fijo
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
    <div>
      <h1>Registro</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />

        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" required />

        <label htmlFor="nombreusuario">Nombre de usuario:</label>
        <input type="text" id="nombreusuario" name="nombreusuario" required />

        <label htmlFor="correo">Correo:</label>
        <input type="email" id="correo" name="correo" required />

        <label htmlFor="telefono">Teléfono:</label>
        <input type="text" id="telefono" name="telefono" required />

        <label htmlFor="contrasena">Contraseña:</label>
        <input type="password" id="contrasena" name="contrasena" required minLength="6" />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}