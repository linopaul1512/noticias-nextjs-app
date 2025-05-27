import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB  = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URL);
      console.log("MongoDB conectado");
    }
  } catch (err) {
    console.error("Error al conectar MongoDB", err);
  }
};

export default connectDB ;
