import { NextResponse } from 'next/server';
import  connectDB  from "@/app/libs/mongoDB";
import Categoria from '@/app/models/categoria';



export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  if (session.user.Tipo !== 'autor') {
    return NextResponse.json({ error: 'No autorizado. Solo los autores pueden crear categorias.' }, { status: 403 });
  }

  try {
    await connectDB();
    const data = await request.json();

    const nuevaCategoria = new Noticia({
      ...data,
      autor: session.user.correo, 
    });

    await nuevaCategoria.save();
    return NextResponse.json(nuevaCategoria, { status: 201 });
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    return NextResponse.json({ error: 'Error al crear la categoría' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const categorias = await Categoria.find();
    return NextResponse.json(connectDB);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las categorias' }, { status: 500 });
  }
}