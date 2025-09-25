import express from "express";
import movieRoutes from "./api/routes/movie.routes";
import { prisma } from "./database/lib/prisma";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/movies", movieRoutes);

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Conectado a la base de datos");
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (err) {
    console.error("Error conectando a la base de datos:", err);
    process.exit(1);
  }
};

startServer();
