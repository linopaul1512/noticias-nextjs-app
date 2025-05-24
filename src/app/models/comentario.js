import mongoose, { Schema } from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    IdUser: {
    type: String,
    required: true,
    },
    IdNoticia: {
    type: String,
    required: true,
    },
    Contenido: {
    type: String,
    required: true,
    }
  },
  { timestamps: true }
);

const Comentario =
  mongoose.models.Comentario || mongoose.model("Comentario", comentarioSchema);

export default Comentario;
