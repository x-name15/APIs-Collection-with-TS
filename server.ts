import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoutes from "./api/routes/movie.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/moviesdb";

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/movies", movieRoutes);

// Conexión a MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch((error) => console.log("Error al conectar a MongoDB:", error));

  app.get("/", (req, res) => {
    res.send("¡Bienvenido a la API de películas! 🚀");
  });
  
