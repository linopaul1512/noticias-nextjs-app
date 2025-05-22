import connectMongoDB from "@/app/libs/mongoDB";
import { NextResponse } from "next/server";
import Usuario from "../models/usuario";

export async function GET() {
  await connectMongoDB();
  const usuarios = await Usuario.find();
  return NextResponse.json({ usuarios }, { status: 200 });
}