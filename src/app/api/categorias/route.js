import { NextResponse } from 'next/server';
import  connectDB  from "@/app/libs/mongoDB";
import Categoria from '@/app/models/categoria';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const nuevaCategoria = new Categoria(data);
    await nuevaCategoria.save();
    return NextResponse.json(nuevaCategoria, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear la categoría' }, { status: 500 });
  }
}
