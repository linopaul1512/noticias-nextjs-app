import mongoose, { Schema } from "mongoose";

const noticiaSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  titular: { type: String, required: true },
  descripcion: { type: String, required: true }, 
  cuerpo: { type: String, required: true },
  categoria: { type: String, required: true },
  iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  imagen: { type: String },
});

const Noticia = mongoose.models.Noticia || mongoose.model('Noticia', noticiaSchema);

export default Noticia;


