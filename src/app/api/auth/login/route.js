import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongoDB";
import Usuario from "@/app/models/usuario";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { correo, contrasena } = await request.json();
    await connectMongoDB();

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return NextResponse.json({ message: "Correo no encontrado" }, { status: 404 });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }

    return NextResponse.json({ message: "Inicio de sesión exitoso", usuario }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al iniciar sesión", error: error.message }, { status: 500 });
  }
}
