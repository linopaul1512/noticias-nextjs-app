import mongoose, { Schema, Document, models, model } from "mongoose";


const usuarioSchema = new Schema<Usuario>(
  {
    nombre: {
    type: String,
    required: true,
    },
    apellido: {
    type: String,
    required: true,
    },
    nombreusuario: {
    type: String,
    required: true,
    },
    tipo: {
    type: String,
    required: true,
    },
    contrasena: {
    type: String,
    required: true,
    },
    correo: {
    type: String,
    required: true,
    },
    telefono: {
    type: String,
    required: true,
    }
  },
  { timestamps: true }
);

const Usuario =
  mongoose.models.Usuario || mongoose.model("Usuario", usuarioSchema);

export default Usuario;

