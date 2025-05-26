import mongoose, { Schema } from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    iduser: {
    type: String,
    required: true,
    },
    idnoticia: {
    type: String,
    required: true,
    },
    contenido: {
    type: String,
    required: true,
    }
  },
  { timestamps: true }
);

const Comentario =
  mongoose.models.Comentario || mongoose.model("Comentario", comentarioSchema);

export default Comentario;
