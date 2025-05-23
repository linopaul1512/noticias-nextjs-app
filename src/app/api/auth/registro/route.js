import connectMongoDB from "@/src/libs/mongoDB";
import Usuario from "@/src/models/Usuario";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const datos = await req.json();
    await connectMongoDB();
    const existe = await Usuario.findOne({ correo: datos.correo });
    if (existe) return NextResponse.json({ message: "Usuario ya registrado" }, { status: 400 });

    await Usuario.create(datos);
    return NextResponse.json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    return NextResponse.json({ message: "Error en el registro" }, { status: 500 });
  }
}
