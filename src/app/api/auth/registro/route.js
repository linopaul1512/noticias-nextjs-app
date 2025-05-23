import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongoDB";
import Usuario from "@/app/models/usuario";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { nombre, apellido, nombreUsuario, tipo, correo, telefono, contrasena } = await request.json();
    await connectMongoDB();

    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return NextResponse.json({ message: "Correo ya registrado" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      nombreUsuario,
      tipo,
      correo,
      telefono,
      contrasena: hashedPassword,
    });

    await nuevoUsuario.save();
    return NextResponse.json({ message: "Usuario registrado correctamente" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error en el registro", error: error.message }, { status: 500 });
  }
}
