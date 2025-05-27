import { NextResponse } from "next/server";
import connectDB from "@/app/libs/mongoDB";
import Usuario from "@/app/models/usuario";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const { correo, contrasena } = await request.json();

    if (!correo || !contrasena) {
      return NextResponse.json({ error: "Correo y contraseña son obligatorios" }, { status: 400 });
    }

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 });
    }

    const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!passwordValida) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    const { contrasena: _, ...usuarioSeguro } = usuario.toObject();

    return NextResponse.json(usuarioSeguro, { status: 200 });

  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 });
  }
}
