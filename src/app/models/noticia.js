import mongoose, { Schema } from "mongoose";

const noticiaSchema = new Schema(
  {
    Fecha: Date,
    Titular: String,
    Descipcion: String,
    Cuerpo: String,
  },
  { timestamps: true }
);

const Noticia =
  mongoose.models.Noticia || mongoose.model("Noticia", noticiaSchema);

export default Noticia;
