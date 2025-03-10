import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const dbURI = process.env.MOVIES_DB_URI as string; 
        await mongoose.connect(dbURI);
        console.log("Conectado a la base de datos de películas");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        process.exit(1);
    }
};

export default connectDB;

