import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Noticia from '@/models/noticia';

export async function GET() {
  try {
    await connectDB();
    const noticias = await Noticia.find();
    return NextResponse.json(noticias);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las noticias' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const nuevaNoticia = new Noticia(data);
    await nuevaNoticia.save();
    return NextResponse.json(nuevaNoticia, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear la noticia' }, { status: 500 });
  }
}
