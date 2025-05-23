import mongoose, { Schema } from "mongoose";

const comentarioSchema = new Schema(
  {
    IdUser: String,
    IdNoticia: String,
    Contenido: String,
  },
  { timestamps: true }
);

const Comentario =
  mongoose.models.Comentario || mongoose.model("Comentario", comentarioSchema);

export default Comentario;