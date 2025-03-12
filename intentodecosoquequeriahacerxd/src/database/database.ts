import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ No se encontró MONGO_URI en .env");
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};
