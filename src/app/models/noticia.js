import mongoose, { Schema } from "mongoose";

const noticiaSchema = new mongoose.Schema(
  {
    Fecha: {
    type: Date,
    required: true,
    },
    Titular: {
    type: String,
    required: true,
    },
    Descipcion:{
    type: String,
    required: true,
    },
    Cuerpo: {
    type: String,
    required: true,
    },
    Categoría: {
    type: String,
    required: true,
    },
    IdUser: {
    type: String,
    required: true,
    },
  },
  { timestamps: true }
);

const Noticia =
  mongoose.models.Noticia || mongoose.model("Noticia", noticiaSchema);

export default Noticia;
