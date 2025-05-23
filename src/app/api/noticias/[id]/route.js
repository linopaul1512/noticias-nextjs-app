import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Noticia from '@/models/noticia';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const noticia = await Noticia.findById(params.id);
    if (!noticia) {
      return NextResponse.json({ error: 'Noticia no encontrada' }, { status: 404 });
    }
    return NextResponse.json(noticia);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener la noticia' }, { status: 500 });
  }
}
