import mongoose, { Schema } from "mongoose";

const noticiaSchema = new mongoose.Schema(
  {
    fecha: {
    type: Date,
    required: true,
    },
    titular: {
    type: String,
    required: true,
    },
    descipcion:{
    type: String,
    required: true,
    },
    cuerpo: {
    type: String,
    required: true,
    },
    categoría: {
    type: String,
    required: true,
    },
    iduser: {
    type: String,
    required: true,
    },
  },
  { timestamps: true }
);

const Noticia =
  mongoose.models.Noticia || mongoose.model("Noticia", noticiaSchema);

export default Noticia;
