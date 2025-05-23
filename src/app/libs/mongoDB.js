import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log("MongoDB conectado");
    }
  } catch (err) {
    console.error("Error al conectar MongoDB", err);
  }
};

export default connectMongoDB;
