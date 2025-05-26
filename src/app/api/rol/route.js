import { NextResponse } from 'next/server';
import  connectDB  from "@/app/libs/mongoDB";
import Rol from '@/app/models/rol';


export async function GET() {
  try {
    await connectDB();
    const roles = await Rol.find();
    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los roles' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const nuevoRol = new Rol(data);
    await nuevoRol.save();
    return NextResponse.json(nuevoRol, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el rol' }, { status: 500 });
  }
}
