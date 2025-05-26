import  connectDB  from "@/app/libs/mongoDB";
import Usuario from "@/app/models/usuario";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        correo: { label: "Correo", type: "text", placeholder: "correo@dominio.com" },
        contrasena: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const userFound = await Usuario.findOne({
          correo: credentials?.correo,
        });


        if (!userFound) throw new Error("Credenciales inválidas");

        const passwordMatch = await bcrypt.compare(
          credentials!.contrasena,
          userFound.contrasena
        );

        if (!passwordMatch) throw new Error("Credenciales inválidas");

        return {
          id: userFound._id,
          correo: userFound.correo,
          tipo: userFound.tipo, // rol del usuario (en la tabla usuariotipo es su rol)
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };